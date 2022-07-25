export let userCache = {};

if (process.env.TOKENS) {
    userCache = JSON.parse(process.env.TOKENS);
} 

export const getBotUserByTeam = async (teamId: string) : Promise<string> => {
    if (userCache[teamId]) {
        return new Promise((resolve) => {
            setTimeout(function() {
                resolve(userCache[teamId]);
            }, 150);
        });
    } else {
        console.error('Team not found in cache: ', teamId);
        return null
    }
}


