import { auth } from "@/auth";
import SearchForm from "../../components/SeachForm";
import StartupCard,{StartupTypeCard} from "../../components/StartupCard";
import { sanityFetch,SanityLive } from "@/sanity/lib/live";
import { Startup_Query } from "@/sanity/lib/queries";
export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query;
  const params = {search : query || null};
  const {data:posts} = await sanityFetch({query: Startup_Query,params}) //for real time updates
  const session = await auth();
  console.log(session?.id);
  return (
    <>
    <section className="pink_container">
    <h1 className="heading">
      Pitch Your Startup, <br />
      Connect With Entrepreneurs
    </h1>
    <p className="sub-heading">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.</p>
    <SearchForm query={query}/>
    </section>
    <section className="section_container">
     <p className="text-30-semibold">
      {query? `Search results for ${query}`: "All Starups"}
     </p>

     <ul className="mt-7 card_grid">
        {posts?.length >0 ?(posts.map((post: StartupTypeCard,index: number)=>(
            <StartupCard key={post?._id} post={post}/>
        ))
        ):(<p className="no-results">No Startups found</p> )
      }
     </ul>
    </section>
    <SanityLive />
    </>
  );
}
