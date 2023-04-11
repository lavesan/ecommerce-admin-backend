import { IPaginationRequest } from "models/pagination.models";

export const getPageAndSize = (
  query: IPaginationRequest
): IPaginationRequest => {
  return {
    page: query.page || 0,
    size: query.size || 10,
  };
};

export const getSkipAndTake = ({ page, size }: IPaginationRequest) => {
  return {
    take: size,
    skip: (page + 1) * size,
  };
};
