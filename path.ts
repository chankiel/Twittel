const paths = {
    root(){
        return "/";
    } ,
    home(){
        return "/home";
    },
    notifications(){
        return "/notifications";
    },
    explore(){
        return "/explore";
    },
    bookmarks(){
        return "/bookmarks";
    },
    post(addname:string, postId:string){
        return `/${addname}/status/${postId}`;
    },
    profile(addname:string){
        return `/${addname}`;
    },
};

export default paths;