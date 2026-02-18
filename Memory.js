const memory = {};

export function saveMessage(user, message){
if(!memory[user]) memory[user] = [];
memory[user].push(message);
}

export function getMemory(user){
return memory[user] || [];
}
