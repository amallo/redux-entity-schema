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
## workflow

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
```Javascript
  addEntity('author', {
      id: '1',
      'username: 'user1', name: 'User 1'
   })
```
```Javascript
  addEntity('comment', {
      id: 'comment1',
      comment: '.....'
   })
```
```Javascript
  addOneToOneEntity('blogPost', 'author', {
      source: '1',
      target: '1'
   })
```
```Javascript
  addOneToManyEntity('author', 'blogPost', {
      source: '1',
      target: '1'
   })
```
```Javascript
  addOneToManyEntity('blogPost', 'comment', {
      source: '1',
      target: 'comment1'
   })
```



