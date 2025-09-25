export function isDev() : boolean {
    return process.env.NODE_ENV === 'development'
}

export async function getAvailableLLMs() : Promise<any[]> {
    const url = 'https://openrouter.ai/api/v1/models';
    const options = {method: 'GET'};

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.data
    } catch (error) {
        console.log(error)
        throw new Error('Can not get the Available Models')
    }
}