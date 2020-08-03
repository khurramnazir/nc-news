const {
  formatDates,
  makeRefObj,
  formatComments,
} = require("../db/utils/utils");

describe("formatDates", () => {
  test("returns an new array", () => {
    const list = [];
    expect(Array.isArray(formatDates(list))).toBe(true);
    expect(formatDates(list)).not.toBe(list);
    expect(formatDates(list)).toEqual([]);
    expect(list).toEqual([]);
  });
  test("given an array of article objects, all keys persist in every object", () => {
    const list = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389,
      },
    ];
    expect(formatDates(list)).not.toBe(list);
    const output = formatDates(list);
    output.forEach((article) => {
      expect(Object.keys(article)).toEqual([
        "title",
        "topic",
        "author",
        "body",
        "created_at",
      ]);
    });
  });
  test("formats the date correctly for a single article object array", () => {
    const list = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389,
      },
    ];
    expect(formatDates(list)).not.toBe(list);
    const output = formatDates(list);
    output.forEach((article) => {
      expect(article.created_at instanceof Date).toBe(true);
    });
    expect(list).toEqual([
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389,
      },
    ]);
  });
  test("formats the date correctly for several articles", () => {
    const list = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389,
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: 1500584273256,
      },
    ];
    expect(formatDates(list)).not.toBe(list);
    const output = formatDates(list);
    output.forEach((article) => {
      expect(article.created_at instanceof Date).toBe(true);
    });
    expect(list).toEqual([
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389,
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: 1500584273256,
      },
    ]);
  });

  test("given an array of comments objects, all keys persist in every object", () => {
    const list = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932,
      },
    ];
    expect(formatDates(list)).not.toBe(list);
    const output = formatDates(list);
    output.forEach((article) => {
      expect(Object.keys(article)).toEqual([
        "body",
        "belongs_to",
        "created_by",
        "votes",
        "created_at",
      ]);
    });
  });
  test("formats the date correctly for a single comments object array", () => {
    const list = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932,
      },
    ];
    expect(formatDates(list)).not.toBe(list);
    const output = formatDates(list);
    output.forEach((comment) => {
      expect(comment.created_at instanceof Date).toBe(true);
    });
    expect(list).toEqual([
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932,
      },
    ]);
  });
  test("formats the date correctly for several comments", () => {
    const list = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932,
      },
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256,
      },
    ];
    expect(formatDates(list)).not.toBe(list);
    const output = formatDates(list);
    output.forEach((comment) => {
      expect(comment.created_at instanceof Date).toBe(true);
    });
    expect(list).toEqual([
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932,
      },
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256,
      },
    ]);
  });
});

describe("makeRefObj", () => {
  test("returns an new array", () => {
    const list = [];
    expect(Array.isArray(makeRefObj(list))).toBe(true);
    expect(makeRefObj(list)).not.toBe(list);
    expect(makeRefObj(list)).toEqual([]);
    expect(list).toEqual([]);
  });
});

describe("formatComments", () => {});
