/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';

// Initialize Clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

// Function to generate embeddings
async function getEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
}

// Function to clean hospital name
function cleanHospitalName(hospitalName: string) {
  return hospitalName.split(",")[0].trim();
}

// Search Pinecone index
async function searchPinecone(index: any, indexName: string, queryEmbedding: number[], topK = 5) {
  if (!index) {
    console.error(`Index '${indexName}' not available`);
    return [];
  }

  try {
    const results = await index.query({
      vector: queryEmbedding,
      topK: topK,
      includeMetadata: true,
    });

    return results.matches || [];
  } catch (error) {
    console.error(`Error searching index ${indexName}:`, error);
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Get index names from environment variables (with fallbacks)
    const HOSPITAL_INDEX = process.env.PINECONE_HOSPITAL_INDEX || "hospital";
    const EXECUTIVE_INDEX = process.env.PINECONE_EXECUTIVE_INDEX || "hospital-executives";
    const ARTICLE_INDEX = process.env.PINECONE_ARTICLE_INDEX || "healthcare-articles";

    // List available indexes and get their names
    const indexList = await pinecone.listIndexes();
    // Convert the IndexList to an array of index names
    const availableIndexes = indexList.indexes ? indexList.indexes.map(index => index.name) : [];

    console.log("Available indexes:", availableIndexes);

    // Connect to indexes if they exist
    const hospitalIndex = availableIndexes.includes(HOSPITAL_INDEX) 
      ? pinecone.index(HOSPITAL_INDEX) 
      : null;
    
    const executiveIndex = availableIndexes.includes(EXECUTIVE_INDEX) 
      ? pinecone.index(EXECUTIVE_INDEX) 
      : null;
    
    const articleIndex = availableIndexes.includes(ARTICLE_INDEX) 
      ? pinecone.index(ARTICLE_INDEX) 
      : null;

    // Step 1: Search hospitals
    const queryEmbedding = await getEmbedding(query);
    const hospitalResults = await searchPinecone(hospitalIndex, HOSPITAL_INDEX, queryEmbedding, 5);

    // Find best hospital match
    let bestHospitalName = null;
    if (hospitalResults.length > 0) {
      const firstResult = hospitalResults[0];
      const metadata = firstResult.metadata || {};
      const hospitalName = metadata.Hospital_Name || "Unknown";
      bestHospitalName = cleanHospitalName(hospitalName);
    }

    // Step 2: Search executives by hospital name
    let executiveResults: any[] = [];
    let executiveNames: any[] = [];

    if (bestHospitalName && executiveIndex) {
      const hospitalEmbedding = await getEmbedding(bestHospitalName);
      
      // Query using both embedding and metadata filter
      try {
        const results = await executiveIndex.query({
          vector: hospitalEmbedding,
          filter: { Hospital_Name: bestHospitalName },
          topK: 20,
          includeMetadata: true,
        });
        
        executiveResults = results?.matches || [];
      } catch (error) {
        console.error("Error querying executives:", error);
      }

      // Extract executive names
      executiveNames = executiveResults.map(doc => {
        const metadata = doc.metadata || {};
        const firstName = metadata.Official_First_Name || "Unknown";
        const lastName = metadata.Official_Last_Name || "Unknown";
        return `${firstName} ${lastName}`;
      });
    }

    // Step 3: Search articles related to hospital and executives
    let articleResults = [];
    if ((bestHospitalName || executiveNames.length > 0) && articleIndex) {
      const refinedQuery = `Latest updates on ${bestHospitalName}, including ${executiveNames.join(', ')}.`;
      const articleQueryEmbedding = await getEmbedding(refinedQuery);
      articleResults = await searchPinecone(articleIndex, ARTICLE_INDEX, articleQueryEmbedding, 10);
    }

    // Step 4: Generate warm lead summary
    // Build context for GPT
    const context = [];

    if (bestHospitalName) {
      context.push(`**Hospital:** ${bestHospitalName}`);
    }

    if (executiveNames.length > 0) {
      context.push(`**Executives:** ${executiveNames.join(', ')}`);
    }

    if (articleResults.length > 0) {
      context.push("**Recent News:**");
      articleResults.forEach((doc: any) => {
        const metadata = doc.metadata || {};
        const title = metadata.title || "Untitled Article";
        const date = metadata.date || "Unknown Date";
        const url = metadata.url || "No URL Available";
        context.push(`- ${title} (${date}) - ${url}`);
      });
    }

    const contextText = context.join('\n');

    // Generate GPT-4o response
    const systemPrompt = `
      You are a sales intelligence assistant generating warm leads.
      Based on the retrieved hospital executives and recent news, craft a compelling outreach strategy.

      **Context:**
      ${contextText}

      Generate a structured response focusing on:
      1. Key decision-makers at the hospital.
      2. Relevant hospital updates from news.
      3. Possible conversation starters for a salesperson.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate a warm lead summary for ${bestHospitalName}.` }
      ]
    });

    const warmLeadSummary = completion.choices[0].message.content;

    // Return all results
    return NextResponse.json({
      hospital: bestHospitalName,
      executives: executiveResults.map(doc => {
        const metadata = doc.metadata || {};
        return {
          name: `${metadata.Official_First_Name || ''} ${metadata.Official_Last_Name || ''}`.trim(),
          title: metadata.Official_Title || 'Unknown Position',
          hospital: metadata.Hospital_Name || 'Unknown Hospital'
        };
      }),
      articles: articleResults.map((doc: any) => {
        const metadata = doc.metadata || {};
        return {
          title: metadata.title || 'Untitled Article',
          date: metadata.date || 'Unknown Date',
          url: metadata.url || 'No URL Available'
        };
      }),
      warmLeadSummary
    });
  } catch (error: any) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}