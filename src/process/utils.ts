export function isDev() : boolean {
    return process.env.NODE_ENV === 'development'
}

export function getAvailableLLMs() : string[] {
    return [
        'DeepSeek',
        'ChatGPT',
        'Gemini',
        'Anthropic'
    ]
}