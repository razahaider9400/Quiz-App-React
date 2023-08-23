const getSelected = (qId, op, selected) => {
  let option = selected.find((elem) => elem.qId === qId && elem.op === op);
  if (option) return "btn btn-border btn-outline-danger w-100 py-2";
  else return "btn btn-border btn-outline-primary w-100 py-2";
};

const getScore = (selected) => {
  let score = selected.filter((elem) => {
    if (elem.op == elem.answer) {
      return elem;
    }
  });
  return score.length;
};

export { getSelected, getScore };
