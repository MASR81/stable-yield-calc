import os
try:
    from google import genai
except ImportError:
    print("Please install the required library first: pip install google-genai")
    exit(1)

def main():
    print("=== StableYieldCalc Social Media Content Engine ===")
    print("This script uses your Gemini API access to generate highly engaging, customized posts.")
    print("---------------------------------------------------\n")

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        api_key = input("Enter your Gemini API Key (or set GEMINI_API_KEY env var): ").strip()
        os.environ["GEMINI_API_KEY"] = api_key

    try:
        client = genai.Client()
    except Exception as e:
        print(f"Error initializing Gemini Client: {e}")
        return

    print("\nWhat is the current state of stablecoin yields today?")
    print("Example: 'USDC is at 5.5% on Aave, USDT is 6% on Compound. Market is bullish.'")
    context = input("\nMarket Context > ")

    prompt = f"""
You are a highly engaging, financial-savvy social media manager for 'StableYieldCalc', a platform that calculates stablecoin yields and checks the regulatory compliance of crypto assets.

Based on the following market context: "{context}"

Please generate the following:

**Task 1: Twitter / X Thread (3 Tweets)**
- Write 3 engaging, threaded tweets (under 280 characters each). 
- Use relevant emojis and hashtags like #DeFi #Stablecoins #CryptoYield. 
- Tweet 1: Hook the audience with the current yield rates from the context.
- Tweet 2: Ask an engaging question about risk vs. reward to drive replies.
- Tweet 3: Subtly promote the '2026 Wealth & Yield Tracker' Notion template available at stableyieldcalc.com.

**Task 2: Detailed Reddit Post**
- Target Audience: r/CryptoCurrency or r/yieldfarming
- Tone: Highly informative, analytical, and objective. "Redditors" despise obvious marketing, so you must provide genuine value first.
- Content: Analyze the yields mentioned in the context. Discuss the regulatory/compliance risks of chasing those yields (e.g., MiCA, SEC). 
- Call to Action: At the very end, casually mention that you built a free tool at stableyieldcalc.com that helps calculate exact APY returns and checks asset compliance, just in case anyone finds it useful.
"""

    print("\nGenerating brilliant content using Gemini...\n")
    
    try:
        # We use gemini-2.5-pro for high-quality, nuanced reasoning and writing
        response = client.models.generate_content(
            model='gemini-2.5-pro',
            contents=prompt,
        )
        print("================ OUTPUT ================\n")
        print(response.text)
        print("\n========================================")
        print("\nDone! Copy and paste these to your social channels. Run this script a few times a week with updated rates!")
    except Exception as e:
        print(f"Error generating content: {e}")

if __name__ == "__main__":
    main()
