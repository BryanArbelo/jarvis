const exampleRequests = [
    {
        clientId: 1,
        requestId: 'abc',
        hours: 6
    },
    {
        clientId: 2,
        requestId: 'ghi',
        hours: 1
    },
    {
        clientId: 1,
        requestId: 'def',
        hours: 4
    },
    {
        clientId: 1,
        requestId: 'zzz',
        hours: 2
    }
]

const exampleReturnValue = {
    butlers: [
        {
            requests: ['abc', 'zzz']
        },
        {
            requests: ['def', 'ghi']
        },
        {
            etc: 'etc...'
        }
    ],
    spreadClientIds: [1, 2]
}




// TEST CODE
const newButler = () => {
    return { clients: [] };
}

function processRequests(requests, x, currentIndex, butlers, accumulatedHours) {
    accumulatedHours = accumulatedHours + x.hours;

    if (accumulatedHours >= 8) { //stop accumulating
        accumulatedHours = x.hours;
        butlers.push(newButler());
    }

    butlers[butlers.length - 1].clients.push(x);

    currentIndex += 1;
    if (requests[currentIndex])
        return processRequests(requests, requests[currentIndex], currentIndex, butlers, accumulatedHours);
    else butlers;
}

function allocateAndReport(requests) {
    const butlers = [newButler()];

    if (requests.length > 1) {
        processRequests(requests,requests[0], 0, butlers, 0);
    }
    console.log('Required butlers ', butlers.length);

    return butlers;
}

allocateAndReport(exampleRequests);

module.exports = {
    allocateAndReport
}