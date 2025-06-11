/**
 * Custom ESLint rule to detect {" "} patterns in JSX
 * This rule specifically catches whitespace expressions that can cause React Native errors
 */

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        'Disallow whitespace expressions like {" "} in JSX that can cause React Native text rendering issues',
      category: "Possible Errors",
      recommended: true,
    },
    fixable: "code",
    schema: [],
    messages: {
      noWhitespaceExpression:
        'Avoid whitespace expressions like {" "} in JSX. In React Native, all text must be wrapped in <Text> components.',
      noUnwrappedText:
        "Text content must be wrapped in a <Text> component in React Native.",
    },
  },

  create(context) {
    return {
      // Check for JSX expressions containing only whitespace
      JSXExpressionContainer(node) {
        // Check if the expression is a string literal containing only whitespace
        if (
          node.expression.type === "Literal" &&
          typeof node.expression.value === "string" &&
          /^\s+$/.test(node.expression.value)
        ) {
          context.report({
            node,
            messageId: "noWhitespaceExpression",
            fix(fixer) {
              // Auto-fix by removing the whitespace expression
              return fixer.remove(node);
            },
          });
        }
      },

      // Check for JSX text nodes (raw text not in expressions)
      JSXText(node) {
        // Skip if the text is only whitespace (newlines, spaces, etc.)
        if (!/\S/.test(node.value)) {
          return;
        }

        // Check if we're inside a Text component or allowed component
        let parent = node.parent;
        let isInTextComponent = false;

        while (parent) {
          if (parent.type === "JSXElement") {
            const elementName = parent.openingElement.name.name;
            if (["Text", "Button"].includes(elementName)) {
              isInTextComponent = true;
              break;
            }
          }
          parent = parent.parent;
        }

        if (!isInTextComponent) {
          context.report({
            node,
            messageId: "noUnwrappedText",
          });
        }
      },
    };
  },
};
