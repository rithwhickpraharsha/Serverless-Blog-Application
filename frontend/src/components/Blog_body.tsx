

interface Tag {
    id: string;
    name: string;
}

interface BlogBodyProps {
    title: string;
    author: string;
    tags: Tag[],
    content:string,
    publishDate:string,
}


const Blog_body: React.FC<BlogBodyProps> = ({title,author,tags,content,publishDate}) =>{
 
return(


<div className="border border-slate-300 p-4 ">

    <div className="flex items-center mb-2"> 
   <Avator name = {author} />  
   <div className="pl-2">{author}</div>
   <div><Circle/></div>
   <div className="pl-2 text-slate-500">{publishDate}</div>

</div>
<div className="text-3xl font-bold mb-2">
    {title}
</div>
<div className="mb-2">
    {content.slice(0,Math.max(50,content.length)) + "..."}
</div>
<div className="flex flex-wrap mb-2">
    {
        tags.map((tag)=>{
            return <button className="mr-2 p-1 bg-slate-500 rounded-lg">{tag.name}</button>
        })
    }
</div>

<div className="font-thin text-slate-500">
    {Math.ceil((content.length)/100)} Minute(s) Read.
</div>
</div>


)


}



export function Avator({name} :{name:string}){
    return(
        
<div className="  relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{name.slice(0,2)}</span>
</div>

    )
}

function Circle(){
    return(
        <div className="h-1 w-1 bg-slate-500 rounded-full ml-2">

        </div>
    )
}
export default Blog_body;
