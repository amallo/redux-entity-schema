# Uses cases

## Add a new BlogPost model

```Javascript
   addEntity('blogPost', {
      id: '1',
      author: { id: 'user1', 'username: 'user1', name: 'User 1' },
      comments: [
      {
        id: 'comment1',
        author: { id: 'user2', username: 'user2', name: 'User 2' },
        comment: '.....'
      }
   })
```
## create a generic reducer

```Javascript
   const blogPostReducer = createEntityReducer('blogPost')()
```


## create a BlogPost by author reducer

```Javascript
  const postByAuthorReducer = (state, action){
     if ( (action.type === 'ADD_ENTITY') && (action.meta.entity === 'blogPost') ){
         return {
            byAuthor: {
               id: 
            }
         }
     }
     return state
  }
  const blogPostReducer = createEntityReducer('blogPost')(initialState)
  export default chainReducer(postByAuthorReducer, blogPostReducer)(initialState)
```
