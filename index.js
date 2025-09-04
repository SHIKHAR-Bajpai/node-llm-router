const { LLMRouter } = require('llm-router-core');
require("dotenv").config()
const readline = require("readline")

// Initialize router with live scraping capabilities
const router = new LLMRouter({
  geminiApiKey: process.env.GEMINI_API_KEY,    // Optional: enables AI analysis
  firecrawlApiKey: process.env.GEMINI_API_KEY // Optional: enables live Vellum scraping
});

// Get intelligent model recommendation with live data

async function main() {
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    try {
    
    // get user query 
    const query = await new Promise( resolve => {
        rl.question("Enter you query: ", (input) => {
            resolve(input)
        })
    })

    if(!query){
        console.log("No query entered!!")
        return 
    }



    // Get intelligent model recommendation with live data
    const result = await router.selectModel(
      query,
      { performance: 0.6, cost: 0.2, speed: 0.2 }
    );
    console.log(result)
    console.log("\n==============================\n")
    console.log('Recommended:', result.selectedModel.name);
    console.log('Score:', result.score);
    console.log('Response:', result.response);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}


main()