import { v4 as uuidv4 } from 'uuid';

function generateSalt(length = 16) { 
    const array = new Uint8Array(length); 
    crypto.getRandomValues(array); 
    return Array.from (array, byte => byte.toString(16).padStart(2, '0')).join('');
}

async function sha256(str: string) { 
    const encoder = new TextEncoder(); 
    const data = encoder.encode(str); 
    const hashBuffer = await crypto.subtle.digest('SHA-256', data); 
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
    
    return hashHex;
}

export async function HashUrlGenerator() { 
    const meetingId = uuidv4(); 
    const salt = generateSalt(); 

    const hashInput = `${meetingId}-${salt}`;
    const hash = await sha256(hashInput); 

    const shortHash = hash.slice(0, 12); 

    const meetingUrl = `${shortHash}`; 

    return {
        url: meetingUrl, 
        meetingId, 
        salt, 
        hash
    }
}