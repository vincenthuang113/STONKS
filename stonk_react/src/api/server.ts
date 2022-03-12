let token = 'dac64136530c9c42a650ae91d9eabd05a169cff2ca3b0d04'

export const server_calls = {
    // get portfolio data
    get_p: async () => {
        const response = await fetch(`http://127.0.0.1:5000/api/portfolio`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*"
            }
        });
        if (!response.ok){
            throw new Error('Failed to fetch data')
        }
        return await response.json()
    },
    // get transaction data
    get_t: async () => {
        const response = await fetch(`http://127.0.0.1:5000/api/transaction`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*"
            }
        });
        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }
        return await response.json()
    },
    // update transaction
    update: async ( id:string, data: any = {} ) => {
        const response = await fetch(`/api/transaction/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        });
    },
    // create transaction
    create: async ( data: any = {} ) => {
        const response = await fetch(`http://127.0.0.1:5000/api/transaction`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
            
        });
        console.log('its working')
    },
    // delete transaction
    delete: async ( id:string ) => {
        const response = await fetch(`http://localhost:5000/transaction/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*"
            }
        });
        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }
        return await response.json()
    }

}
