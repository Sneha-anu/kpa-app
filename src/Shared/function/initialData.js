const initialData = [
  {
    type: "component",
    title: "Reusable forms in React",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "4",
    created_on: "2020-02-04T14:44:30",
    modified_on: "2020-02-04T14:44:30",
    id: 51827270,
    name: "Dinesh S",
    designation: "TL"
  },
  {
    type: "component",
    title: "Perfomance Optimization",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "3",
    created_on: "2020-01-04T14:44:30",
    modified_on: "2020-01-04T14:44:30",
    id: 51827270,
    name: "Dinesh S",
    designation: "TL"
  },
  {
    type: "component",
    title: "Pagination in Jquery",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "2",
    created_on: "2020-03-04T14:44:30",
    modified_on: "2020-03-04T14:44:30",
    id: 51827270,
    name: "Dinesh S",
    designation: "TL"
  },
  {
    type: "Master_class",
    title: "Redux core concepts",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "4",
    created_on: "2020-01-14T14:44:30",
    modified_on: "2020-01-14T14:44:30",
    id: 51827270,
    name: "Dinesh S",
    designation: "TL"
  },
  {
    type: "Tech_session",
    title: "Redux core concepts",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "1",
    created_on: "2020-02-04T14:44:30",
    modified_on: "2020-02-04T14:44:30",
    id: 51827270,
    name: "Dinesh S",
    designation: "TL"
  },
  {
    type: "component",
    title: "Notification Offline Availability in Angular",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "4",
    created_on: "2019-11-04T14:44:30",
    modified_on: "2019-11-04T14:44:30",
    id: 51823350,
    name: "Manoj Mehar Gupta Voonna",
    designation: "TE"
  },
  {
    type: "component",
    title: "netwoek Optimization",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "3",
    created_on: "2019-12-04T14:44:30",
    modified_on: "2019-12-04T24:44:30",
    id: 51823350,
    name: "Manoj Mehar Gupta Voonna",
    designation: "TE"
  },
  {
    type: "component",
    title: "search query in Jquery",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "2",
    created_on: "2020-01-06T14:44:30",
    modified_on: "2020-01-06T14:44:30",
    id: 51823350,
    name: "Manoj Mehar Gupta Voonna",
    designation: "TE"
  },
  {
    type: "Master_class",
    title: "Angular Forms",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "2",
    created_on: "2019-12-17T14:44:30",
    modified_on: "2019-12-17T14:44:30",
    id: 51823350,
    name: "Manoj Mehar Gupta Voonna",
    designation: "TE"
  },
  {
    type: "Tech_session",
    title: "Angular Forms",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "1",
    created_on: "2019-11-01T14:44:30",
    modified_on: "2019-11-01T14:44:30",
    id: 51823350,
    name: "Manoj Mehar Gupta Voonna",
    designation: "TE"
  },
  {
    type: "component",
    title: "Reusable forms in React",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "4",
    created_on: "2019-12-28T14:44:30",
    modified_on: "2019-12-28T14:44:30",
    id: 51474893,
    name: "Johnson A",
    designation: "TM"
  },
  {
    type: "Master_class",
    title: "RXJS core concepts",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "4",
    created_on: "2020-01-05T14:44:30",
    modified_on: "2020-01-05T14:44:30",
    id: 51474893,
    name: "Johnson A",
    designation: "TM"
  },
  {
    type: "Tech_session",
    title: "RXJS core concepts",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "4",
    created_on: "2020-03-08T14:44:30",
    modified_on: "2020-03-08T14:44:30",
    id: 51474893,
    name: "Johnson A",
    designation: "TM"
  },
  {
    type: "component",
    title: "code splitting & Optimization",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "3",
    created_on: "2020-02-23T14:44:30",
    modified_on: "2020-02-23T14:44:30",
    id: 51474893,
    name: "Johnson A",
    designation: "TM"
  },
  {
    type: "component",
    title: "Grid manage in React",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "4",
    created_on: "2020-01-22T14:44:30",
    modified_on: "2020-01-22T14:44:30",
    id: 51474893,
    name: "Johnson A",
    designation: "TM"
  },
  {
    type: "component",
    title: "Date Reusable component",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "4",
    created_on: "2020-01-12T14:44:30",
    modified_on: "2020-01-12T14:44:30",
    id: 51733625,
    name: "Sucindran M",
    designation: "TL"
  },
  {
    type: "case_study",
    title: "Date Reusable component",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "2",
    created_on: "2020-03-16T14:44:30",
    modified_on: "2020-03-16T14:44:30",
    id: 51733625,
    name: "Sucindran M",
    designation: "TL"
  },
  {
    type: "Master_class",
    title: "Forms concepts",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "1",
    created_on: "2020-01-06T14:44:30",
    modified_on: "2020-01-06T14:44:30",
    id: 51733625,
    name: "Sucindran M",
    designation: "TL"
  },
  {
    type: "Tech_session",
    title: "Forms concepts",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: "1",
    created_on: "2020-03-12T14:44:30",
    modified_on: "2020-03-12T14:44:30",
    id: 51733625,
    name: "Sucindran M",
    designation: "TL"
  }
];

export default initialData;

export const kpaModel = [
  {
    name: "component",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: [
      { title: "Title Registered", id: "1" },
      { title: "Component Agenda", id: "2" },
      { title: "Code Shared", id: "3" },
      { title: "Code Published", id: "4" }
    ],
    target: {}
  },
  {
    name: "Tech_session",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: [
      { title: "Title Registered", id: "1" },
      { title: "Mail Agenda", id: "2" },
      { title: "PPT Review", id: "3" },
      { title: "Schedule Meeting", id: "4" },
      { title: "Completed", id: "5" }
    ],
    target: {}
  },
  {
    name: "Master_class",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: [
      { title: "Title Registered", id: "1" },
      { title: "Mail Agenda", id: "2" },
      { title: "PPT Review", id: "3" },
      { title: "Schedule Meeting", id: "4" },
      { title: "Completed", id: "5" }
    ],
    target: {}
  },
  {
    name: "case_study",
    description:
      "With supporting text below as a natural lead-in to additional content.",
    stage: [
      { title: "Title Registered", id: "1" },
      { title: "PPT review", id: "2" }
    ],
    target: {}
  }
];
