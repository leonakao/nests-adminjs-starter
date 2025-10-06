export type QueryFilterValue = string | number | boolean;

export type QueryFilter = QueryFilterValue | QueryFilterValue[];

export type QueryFilters = Record<string, QueryFilter>;
