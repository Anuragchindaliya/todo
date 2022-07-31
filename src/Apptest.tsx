import React from 'react';
import { textSpanEnd } from 'typescript';
// import { render, screen } from '@testing-library/react';
// import App from './App';
const sum = (a: number, b: number): number => {
  return a + b;
}

// describe("Testing sum", () => {
//   const sum = (a: number, b: number): number => {
//     return a + b;
//   }
//   test("should equal to 4", () => {
//     expect(sum(2, 2)).toBe(4);
//   })
//   it("should equal 4", () => {
//     expect(sum(4, 5)).toBe(9);
//   })
// })
test.todo("create function which sum the input");
// test.todo("sum testing")
test("sum testing", () => {
  expect(sum(4, 4)).toBe(8)
});
interface LooseObject {
  [key: string]: any
}
// test.todo("object comparison");
test("object comparison", () => {
  const data: LooseObject = { one: 1 };
  data["two"] = 2;
  expect(data).toStrictEqual({ one: 1, two: 2 });

})
// test.todo("check null")
test("check null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
})


describe('renders learn react link', () => {
  // render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  describe("Testing Sum", () => {
    const sum = (a: number, b: number): number => {
      return a + b;
    }
    it("should equal to 4", () => {
      expect(sum(2, 2)).toBe(4);
    })

    test("also should equal to 9", () => {
      expect(sum(5, 4)).toBe(9);
    })
  })
});
