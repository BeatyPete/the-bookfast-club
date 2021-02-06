$(".delete-btn").on("click", function() {
    const postId = $(this).attr('id')
    deletePost(postId)
})

async function deletePost(id) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }