import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useLazySaga from "../../shared/hooks/useLazySaga";
import useLazyReducer from "../../shared/hooks/useLazyReducer";
import { getMessageRequestAction } from "./fakeDomain.action";
import LazyComponent from "./LazyComponent";

jest.mock("react-redux");
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;
const mockDispatch = jest.fn();

jest.mock("../../shared/hooks/useLazySaga");
jest.mock("../../shared/hooks/useLazyReducer");

describe("Todos", () => {
  beforeEach(() => {
    (mockUseDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it("should dispatch getTodosRequestAction when component is mounted and todo reducer and saga are injected", async () => {
    // Given
    (useSelector as jest.Mock).mockReturnValue("blabla");
    (useLazySaga as jest.Mock).mockReturnValue(true);
    (useLazyReducer as jest.Mock).mockReturnValue(true);

    // When
    await act(async () => {
      render(<LazyComponent />);
    });

    // Then
    expect(mockDispatch).toBeCalledWith(getMessageRequestAction());
  });
});
