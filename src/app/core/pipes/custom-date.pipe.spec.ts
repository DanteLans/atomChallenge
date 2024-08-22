import { CustomDatePipe } from "../pipes/custom-date.pipe";

describe('CustomDatePipe', () => {
  const task = {
    "id": "dalejandro.monzon@gmail.com",
    "dateCreated": {
      "_seconds": 1724044929,
      "_nanoseconds": 811000000
    },
    "email": "dalejandro.monzon@gmail.com"
  };
  let pipe: CustomDatePipe;

  beforeEach(() => {
    pipe = new CustomDatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform the dateCreated from firestore value to a formatted date string', () => {
    const transformedDate = pipe.transform(task);

    expect(transformedDate.toLocaleString()).toEqual('8/18/2024, 11:22:09 PM');
  });
});
