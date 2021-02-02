module.exports = {
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
    },
    log: thing=> {
      const bla = thing[0].user_id
      return bla
      /* async function dostuff() {
        const response = await fetch('/api/posts/logout', {
          method: 'get',
          headers: { 'Content-Type': 'application/json' }
        });
      
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert(response.statusText);
        }
      } */
    }
  };