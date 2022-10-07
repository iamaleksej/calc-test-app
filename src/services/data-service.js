const url = 'https://eoj3r7f3r4ef6v4.m.pipedream.net'
// const url = 'https://jsonplaceholder.typicode.com/posts'
const sendData = async (newData) => {

   try {
      const request = async () => {
         const res = await fetch(url, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(newData)
         });
         const data = await res.json();


         if (!res.ok) {
            throw new Error(data);
         }
      };
      if (newData) {
         request();
      }
   } catch (e) {
      return e;
   }
};

export { sendData }