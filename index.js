const CHAR_WAITING = ".";
const CHAR_SUCCESS = "|";
const CHAR_FAILURE = "X";
const BAR_WIDTH = 20;

module.exports = async (label, proms) => {
    let states = [];
    proms.map((_) => states.push(CHAR_WAITING));

    logStates(label, states);

    const bingus = proms.map((p, i) => {
        return new Promise(async (resolve) => {
            try {
                const res = await p;
                if (res != null) {
                    setState(label, states, i + 1, CHAR_SUCCESS);
                    resolve(res);
                } else {
                    setState(label, states, i + 1, CHAR_FAILURE);
                    resolve(null);
                }
            } catch (error) {
                setState(label, states, i + 1, CHAR_FAILURE);
                resolve(null);
            }
        });
    });

    const resolved = await Promise.all(bingus);
    const successful = resolved.filter((r) => r != null);

    return successful;
};

const logStates = (label, states) => {
    const totalCount = states.length;
    let progressCount = 0;
    let successCount = 0;

    if (totalCount >= 1) {
        console.clear();
        console.debug(`\n${label}`);

        let statesMsg = "";
        let progressMsg = "";
        let successMsg = "";

        states.forEach((state, i) => {
            if (i % BAR_WIDTH == 0) statesMsg += "\r\n";
            statesMsg += state;

            if (state == CHAR_SUCCESS) ++successCount;
            if (state != CHAR_WAITING) ++progressCount;
        });

        const progressPercent = Math.round((progressCount * 100) / totalCount);
        const successPercent = Math.round((successCount * 100) / totalCount);

        progressMsg = `${progressPercent}% resolved (${progressCount}/${totalCount})`;
        successMsg = `${successPercent}% success (${successCount}/${totalCount})`;

        console.debug(statesMsg);
        console.debug("");
        console.debug(progressMsg);
        console.debug("");
        console.debug(successMsg);
        console.debug("");
    }
};

const setState = (label, states, num, char) => {
    states[num - 1] = char;
    logStates(label, states);
};
