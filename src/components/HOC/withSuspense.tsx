import React, { FC, ReactElement } from "react";

interface withSuspenseProps {
  page: string;
}


const withSuspense = (args: withSuspenseProps): FC<any> => {
  const { page } = args;

  return function (props: Record<string, any>): ReactElement{
    const LazyComponent = React.lazy(() => import(`pages/${page}`));

    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <LazyComponent {...props} />
      </React.Suspense>
    );
  };
}

export default withSuspense;