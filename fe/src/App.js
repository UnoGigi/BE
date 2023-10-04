import  ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css"
import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {

    const [page, setPage] = useState(1);
    const [post, setPost] = useState([])
    const [totalPages, setTotalPages] = useState(0)

    const getPost = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/posts?page=${page}`) /* per importare variabile d'ambiente*/
            setPost(response.data.posts)
            setPage(response.data.currentPages)
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.log(error);
        }

        
    }

    useEffect(() => {
        getPost();
    }, [page])

    const onChange = (value) => {
        setPage(value)
    }

    


    return (
    <div>
        {post && post?.map((post) => {
            <p>{post.title}</p>
        })}

        {totalPages && (
            <ResponsivePagination 
            current={page}
            total={totalPages}
            onPageChange={onChange}
            />)}
    </div>

)
}

export default App