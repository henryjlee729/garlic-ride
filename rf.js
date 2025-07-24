eList.forEach(eInfo => {
    edgeList.push(new Edge(nodes[eInfo[0]], nodes[eInfo[1]], eInfo[2]));
});