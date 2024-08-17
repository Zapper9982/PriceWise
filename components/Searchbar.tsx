"use client"

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react"


const Searchbar = () => {
     const isValidAmazonProducturl = (url:string)=>{
         try {
          const parsedURL = new URL(url);
          const hostname = parsedURL.hostname;
          if(hostname.includes('amazon.com') || hostname.includes('amazon.in') || hostname.includes('amazon.') || hostname.endsWith('amazon')){

              return true;
          }
          
         } catch (error) {
          return false;
          
         }
         return false;

     }
     const [SearchPrompt , setSearchPrompt] = useState('');
     const [isLoading , setIsLoading] = useState(false);
    const handleSubmit = async (event : FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      const isValidLink = isValidAmazonProducturl(SearchPrompt);
     if(!isValidLink){
         return  alert('Please Enter a valid Amazon Product Link');

     }
     try {
         setIsLoading(true);
         
         //Scraping the product page 
         const product = await scrapeAndStoreProduct(SearchPrompt);
     } catch (error) {
      console.log(error);
     } finally{
         setIsLoading(false);
     }



    }
  return (
   <form 
   className='flex flex-wrap gap-4 mt-12'
   onSubmit={handleSubmit}>
    <input
    type="text"
    placeholder="Enter product Link"
    value={SearchPrompt}
    onChange={(e)=>setSearchPrompt(e.target.value)}
    className="searchbar-input" />
    <button type="submit" className="searchbar-btn" disabled={SearchPrompt===''}>
      {isLoading ? 'Searching...' : 'Search'}

    </button>



   </form>
  )
}

export default Searchbar