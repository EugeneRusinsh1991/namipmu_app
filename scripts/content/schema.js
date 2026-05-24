function validateSchema(value, schema, path = 'root', errors = []) {
  if (!schema || typeof schema !== 'object') {
    return errors;
  }

  if (schema.type) {
    const actualType = Array.isArray(value) ? 'array' : value === null ? 'null' : typeof value;
    if (schema.type !== actualType) {
      errors.push(`${path} should be ${schema.type} but got ${actualType}`);
      return errors;
    }
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${path} should be one of ${JSON.stringify(schema.enum)} but got ${JSON.stringify(value)}`);
  }

  if (schema.type === 'object' && schema.properties) {
    const keys = Object.keys(schema.properties);
    keys.forEach((key) => {
      if (value[key] !== undefined) {
        validateSchema(value[key], schema.properties[key], `${path}.${key}`, errors);
      } else if (schema.required && schema.required.includes(key)) {
        errors.push(`${path}.${key} is required`);
      }
    });
  }

  if (schema.type === 'array' && Array.isArray(value)) {
    if (schema.minItems != null && value.length < schema.minItems) {
      errors.push(`${path} should have at least ${schema.minItems} items`);
    }
    if (schema.items) {
      value.forEach((item, index) => {
        validateSchema(item, schema.items, `${path}[${index}]`, errors);
      });
    }
  }

  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    const valid = schema.oneOf.some((subschema) => {
      const snapshot = [];
      validateSchema(value, subschema, path, snapshot);
      return snapshot.length === 0;
    });
    if (!valid) {
      errors.push(`${path} does not match any schema in oneOf`);
    }
  }

  return errors;
}

const localizedTextSchema = {
  type: 'object',
  properties: {
    ua: { type: 'string' },
    ru: { type: 'string' },
    eng: { type: 'string' },
    ger: { type: 'string' },
  },
  required: ['ua', 'ru', 'eng', 'ger'],
};

const contentItemSchema = {
  type: 'object',
  properties: {
    type: { type: 'string' },
    text: localizedTextSchema,
    title: localizedTextSchema,
    description: localizedTextSchema,
    backText: localizedTextSchema,
    href: { type: 'string' },
    url: { type: 'string' },
    seconds: { type: 'number' },
    size: { type: 'string' },
    image: localizedTextSchema,
    src: localizedTextSchema,
    question: localizedTextSchema,
    questions: {
      type: 'array',
      minItems: 0,
      items: {
        type: 'object',
        properties: {
          question: localizedTextSchema,
          options: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                text: localizedTextSchema,
                value: { type: 'string' },
              },
              required: ['text', 'value'],
            },
          },
          correctAnswer: { type: 'string' },
        },
        required: ['question', 'options'],
      },
    },
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          text: localizedTextSchema,
        },
        required: ['text'],
      },
    },
  },
  required: ['type'],
};

const contentSchema = {
  type: 'array',
  items: contentItemSchema,
};

function validateContentSchema(content, sheetName) {
  const errors = validateSchema(content, contentSchema, `content[${sheetName}]`);
  if (errors.length > 0) {
    const message = [`Нарушение схемы контента для листа ${sheetName}:`, ...errors].join('\n');
    throw new Error(message);
  }
}

module.exports = {
  validateContentSchema,
};
