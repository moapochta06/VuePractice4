const API = '/api'; 

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
// export const login = (user) => {
//     return new Promise((resolve, reject) => {
//         fetch(`${API}/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8',
//             },
//             mode: 'cors' ,
//             body: JSON.stringify(user),
//         })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('Authentication failed');
//             }
//             return response.json();
//         })
//         .then((result) => resolve(result.data.user_token)) 
//         .catch((error) => {
//             reject(error);
//         });
//     });
// };

