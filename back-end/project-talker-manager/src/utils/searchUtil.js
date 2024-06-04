const getSearch = (query, rate, date, talkers) => {
    let newTalkers = talkers;
    if (query) {
    const lowerCaseQuery = query.toLowerCase();
        newTalkers = talkers.filter((talker) =>
        talker.name.toLowerCase().includes(lowerCaseQuery));
    }
    if (rate) {
        newTalkers = newTalkers.filter((talker) => 
        talker.talk.rate === Number(rate));
    }
    if (date) {
        newTalkers = newTalkers.filter((talker) =>
        talker.talk.watchedAt === date);
    }
    return newTalkers;
};

module.exports = { getSearch };