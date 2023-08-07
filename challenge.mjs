// challenge.mjs

const weirdExpressions = [
  "a othoba b",
  "b ebong c othoba d",
  "ebong ebong othoba othoba ebong",
  "((ebong) othoba ebong) ebong othoba",
  "(ebong othoba (ebong ebong ((othoba) othoba (ebong))))",
  "ebong",
];

function convertWeirdExpression(expression) {
  const tokens = expression.split(" ");
  let output = '';
  let prevTokenWasOperator = false;
  let i=0;
  for (let token of tokens) {
    while(token[0]==='(')
    {
      output+="(";
      token=token.slice(1);
    }
    let endbr="";
    while(token[token.length-1]==')')
    {
      endbr+=")";
      token=token.slice(0,-1);
    }
    if(i===0)
    {
      output+=token;
      output+=endbr;
      i++;
      continue;
    }
    if(token==="ebong")
    {
      if(prevTokenWasOperator===true)
      {
        output+=token;
        prevTokenWasOperator=false;
      }
      else
      {
        output+=" && ";
        prevTokenWasOperator=true;
      }
    }
    else if(token==="othoba")
    {
      if(prevTokenWasOperator===true)
      {
        output+=token;
        prevTokenWasOperator=false;
      }
      else
      {
        output+=" || ";
        prevTokenWasOperator=true;
      }
    }
    else
    {
      output+=token;
      prevTokenWasOperator=false;
    }
    output+=endbr;
    i++;
  }

  return output.trim();
}

for (const expression of weirdExpressions) {
  console.log(convertWeirdExpression(expression));
}
