import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import {Container} from "../componets/index";
import Button from '../componets/Button'
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [isAuthor, setIsAuthor] = useState(false);
    const userData = useSelector((state) => state.auth.userdata);

    useEffect( ()=>{
        if(userData && post?.userId === userData.$id)setIsAuthor(true)
            else setIsAuthor(false);
        return ()=>{};
    },[post,userData]);
   

   

    useEffect(() => {
        if (slug) {
            service.getpost(slug).then((post) => {
                if (post) {setPost(post);
                    
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletepost(post.$id).then((status) => {
            if (status) {
                service.deletefile(post.featuredimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getfilepreview(post.featuredimage)}
                        alt={post.title}
                        className="rounded-xl w-96 h-96"
                    />

                    {isAuthor && (
                        
                        <div className="absolute right-6 top-6 ">
                            <div className="mx-2">
                            <Link to={`/edit-post/${post.$id}`} >
                                <Button bgColor="bg-green-500">
                                    Edit
                                </Button>
                            </Link>
                            </div>
                            <div className="mx-2">
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                            </div>
                          
                            
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
