import React,{useState,useEffect} from "react";
import {Container,PostCard} from "../componets";
import service from "../appwrite/config";

function AllPost(){
        const [posts,setposts] = useState([])
        useEffect(() => {
            service.getPosts([]).then((posts) =>{
                if(posts){
                    setposts(posts.documents)
                }} ) 
        },[])
       
        if(posts.length === 0){
            return(
                <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No post yet 
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
            )
        }else{
            return(
                <div className="w-full py-8">
                    <Container>
                        <div className="flex flex-wrap">
                            {posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard {...post}/>
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            )
        }

  
}

export default AllPost