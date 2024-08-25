export const generateBsComponent = (defaultProps = {}) => {
  const kebabCase = (string) =>
    string
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();

  const Component = (declaredProps) => {
    const retainedDefaultProps = Object.fromEntries(
      Object.entries(defaultProps).filter(([key]) => !(key in declaredProps))
    );

    const mergedProps = { ...retainedDefaultProps, ...declaredProps };

    const { className = "", as = "div", ...restOfProps } = mergedProps;

    const normalProps = Object.fromEntries(
      Object.entries(restOfProps).filter(([key]) => !key.startsWith("bs"))
    );

    const bsProps = Object.fromEntries(
      Object.entries(restOfProps).filter(([key]) => key.startsWith("bs"))
    );

    const bsClassName = Object.entries(bsProps)
      .map(([name, value]) =>
        [value]
          .flat()
          .filter((element) => typeof element === "string")
          .map((string) =>
            [kebabCase(name).split("-").slice(1).join("-"), kebabCase(string)]
              .filter((string) => string.length > 0)
              .join("-")
          )
      )
      .flat()
      .join(" ");

    const entireClassName = [className, bsClassName]
      .filter((string) => string.length > 0)
      .join(" ");

    const finalProps = { className: entireClassName, ...normalProps };

    const As = as;

    return <As {...finalProps}></As>;
  };

  return Component;
};
