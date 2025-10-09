class C{async executeRequest(e){const t=performance.now(),r=new Date().toISOString();try{const s={method:e.method,headers:e.headers};if(e.body&&!["GET","HEAD"].includes(e.method)){const d=e.headers["Content-Type"]||"application/json";if(d==="application/json")s.body=JSON.stringify(e.body);else if(d==="application/x-www-form-urlencoded"){const l=new URLSearchParams;Object.entries(e.body).forEach(([g,m])=>{l.append(g,String(m))}),s.body=l.toString()}else s.body=e.body}const n=await fetch(e.url,s),i=performance.now()-t,p=this.extractHeaders(n.headers),h=n.headers.get("content-type")||"";let u;try{h.includes("application/json")?u=await n.json():h.includes("text/")?u=await n.text():u=await n.blob()}catch{u=await n.text()}const b={duration:Math.round(i),status:n.status,statusText:n.statusText,size:parseInt(n.headers.get("content-length")||"0"),cached:n.headers.get("x-cache")==="HIT"},c={status:n.status,statusText:n.statusText,headers:p,body:u};return n.ok||(c.error={message:u?.message||u?.error||n.statusText,code:u?.code||String(n.status),details:u}),{request:e,response:c,metrics:b,timestamp:r,success:n.ok}}catch(s){const o=performance.now()-t;return{request:e,metrics:{duration:Math.round(o),status:0,statusText:"Network Error"},timestamp:r,success:!1,error:s instanceof Error?s.message:"Unknown error occurred"}}}extractHeaders(e){const t={};return e.forEach((r,s)=>{t[s]=r}),t}async testEndpoint(e){const t=performance.now();try{await fetch(e,{method:"HEAD",mode:"no-cors"});const r=performance.now();return{reachable:!0,responseTime:Math.round(r-t)}}catch{const r=performance.now();return{reachable:!1,responseTime:Math.round(r-t)}}}async executeBatch(e){return Promise.all(e.map(t=>this.executeRequest(t)))}async executeWithRetry(e,t=3,r=1e3){let s=null;for(let n=0;n<=t;n++){const o=await this.executeRequest(e);if(o.success)return o;if(s=o,o.response?.status&&o.response.status>=400&&o.response.status<500)break;n<t&&await this.delay(r*(n+1))}return s||{request:e,metrics:{duration:0,status:0,statusText:"Failed"},timestamp:new Date().toISOString(),success:!1,error:"Max retries exceeded"}}delay(e){return new Promise(t=>setTimeout(t,e))}}const q=new C;function f(a,e,t={}){const r=T(a.baseUrl,e.path,t.pathParams,t.queryParams),s=x(a,e,t.headers,t.authentication);return{endpointId:e.id,method:e.method,url:r,headers:s,pathParams:t.pathParams,queryParams:t.queryParams,body:t.body,authentication:t.authentication}}function T(a,e,t,r){let s=e;t&&Object.entries(t).forEach(([o,i])=>{s=s.replace(`{${o}}`,encodeURIComponent(String(i)))});const n=new URL(s,a);return r&&Object.entries(r).forEach(([o,i])=>{i!=null&&i!==""&&n.searchParams.append(o,String(i))}),n.toString()}function x(a,e,t,r){const s={};if(a.globalHeaders&&Object.assign(s,a.globalHeaders),t&&Object.assign(s,t),r){const n=P(r,a.authentication||e.authentication);Object.assign(s,n)}return s}function P(a,e){const t={};switch(a.type){case"bearer":a.token&&(t.Authorization=`Bearer ${a.token}`);break;case"apiKey":if(a.token&&e?.location==="header"){const r=e.parameterName||"X-API-Key";t[r]=a.token}break;case"basic":if(a.credentials?.username&&a.credentials?.password){const r=btoa(`${a.credentials.username}:${a.credentials.password}`);t.Authorization=`Basic ${r}`}break;case"oauth2":a.token&&(t.Authorization=`Bearer ${a.token}`);break}return t}function v(a,e){switch(e){case"curl":return S(a);case"javascript":return I(a);case"python":return k(a);case"go":return A(a);case"php":return E(a);case"java":return $(a);case"ruby":return R(a);default:return S(a)}}function S(a){const e=["curl"];if(a.method!=="GET"&&e.push(`-X ${a.method}`),Object.entries(a.headers).forEach(([t,r])=>{e.push(`-H "${t}: ${r}"`)}),a.body){const t=typeof a.body=="string"?a.body:JSON.stringify(a.body);e.push(`-d '${t}'`)}return e.push(`"${a.url}"`),e.join(` \\
  `)}function I(a){const e={method:a.method,headers:a.headers};return a.body&&(e.body=JSON.stringify(a.body)),`fetch('${a.url}', ${JSON.stringify(e,null,2)})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}function k(a){const e=["import requests","",'url = f"{request.url}"'];Object.keys(a.headers).length>0&&(e.push("headers = {"),Object.entries(a.headers).forEach(([s,n],o,i)=>{const p=o<i.length-1?",":"";e.push(`    "${s}": "${n}"${p}`)}),e.push("}")),a.body&&e.push(`data = ${JSON.stringify(a.body,null,2)}`);const t=a.method.toLowerCase(),r=["url"];return Object.keys(a.headers).length>0&&r.push("headers=headers"),a.body&&r.push("json=data"),e.push(""),e.push(`response = requests.${t}(${r.join(", ")})`),e.push("print(response.json())"),e.join(`
`)}function A(a){const e=["package main","","import (",'    "bytes"','    "encoding/json"','    "fmt"','    "io"','    "net/http"',")","","func main() {",`    url := "${a.url}"`];a.body&&(e.push(""),e.push("    data := map[string]interface{}{"),Object.entries(a.body).forEach(([r,s],n,o)=>{const i=n<o.length-1?",":"",p=typeof s=="string"?`"${s}"`:s;e.push(`        "${r}": ${p}${i}`)}),e.push("    }"),e.push(""),e.push("    jsonData, _ := json.Marshal(data)"),e.push("    payload := bytes.NewBuffer(jsonData)"));const t=a.body?"payload":"nil";return e.push(""),e.push(`    req, _ := http.NewRequest("${a.method}", url, ${t})`),Object.keys(a.headers).length>0&&(e.push(""),Object.entries(a.headers).forEach(([r,s])=>{e.push(`    req.Header.Add("${r}", "${s}")`)})),e.push(""),e.push("    client := &http.Client{}"),e.push("    resp, err := client.Do(req)"),e.push("    if err != nil {"),e.push("        panic(err)"),e.push("    }"),e.push("    defer resp.Body.Close()"),e.push(""),e.push("    body, _ := io.ReadAll(resp.Body)"),e.push("    fmt.Println(string(body))"),e.push("}"),e.join(`
`)}function E(a){const e=["<?php","",`$url = "${a.url}";`];return e.push("","$ch = curl_init($url);"),e.push("curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);"),e.push(`curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "${a.method}");`),Object.keys(a.headers).length>0&&(e.push(""),e.push("$headers = ["),Object.entries(a.headers).forEach(([t,r])=>{e.push(`    "${t}: ${r}",`)}),e.push("];"),e.push("curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);")),a.body&&(e.push(""),e.push(`$data = ${JSON.stringify(a.body,null,2)};`),e.push("curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));")),e.push(""),e.push("$response = curl_exec($ch);"),e.push("curl_close($ch);"),e.push(""),e.push("echo $response;"),e.push("?>"),e.join(`
`)}function $(a){const e=["import java.net.http.*;","import java.net.URI;","","public class ApiClient {","    public static void main(String[] args) throws Exception {","        HttpClient client = HttpClient.newHttpClient();","",`        String url = "${a.url}";`];let t="HttpRequest.BodyPublishers.noBody()";if(a.body){const r=JSON.stringify(a.body);e.push(`        String json = "${r.replace(/"/g,'\\"')}";`),t="HttpRequest.BodyPublishers.ofString(json)"}return e.push(""),e.push("        HttpRequest request = HttpRequest.newBuilder()"),e.push("            .uri(URI.create(url))"),e.push(`            .method("${a.method}", ${t})`),Object.entries(a.headers).forEach(([r,s])=>{e.push(`            .header("${r}", "${s}")`)}),e.push("            .build();"),e.push(""),e.push("        HttpResponse<String> response = client.send(request,"),e.push("            HttpResponse.BodyHandlers.ofString());"),e.push(""),e.push("        System.out.println(response.body());"),e.push("    }"),e.push("}"),e.join(`
`)}function R(a){const e=['require "net/http"','require "json"',"",`url = URI("${a.url}")`];e.push(""),e.push("http = Net::HTTP.new(url.host, url.port)"),a.url.startsWith("https")&&e.push("http.use_ssl = true");const t=a.method.charAt(0)+a.method.slice(1).toLowerCase();return e.push(""),e.push(`request = Net::HTTP::${t}.new(url)`),Object.entries(a.headers).forEach(([r,s])=>{e.push(`request["${r}"] = "${s}"`)}),a.body&&(e.push(""),e.push(`request.body = ${JSON.stringify(a.body,null,2)}`)),e.push(""),e.push("response = http.request(request)"),e.push("puts response.body"),e.join(`
`)}const H={id:"ecommerce-api",name:"E-commerce API",baseUrl:"https://api.ecommerce-demo.example.com/v1",version:"1.0.0",description:"Complete e-commerce backend with microservices architecture, Redis caching, and JWT authentication. Handles 2,800+ RPS with sub-100ms response times.",documentation:"https://docs.ecommerce-demo.example.com",repositoryUrl:"https://github.com/yourusername/ecommerce-api",authentication:{type:"bearer",required:!0,tokenEndpoint:"/auth/login",description:"JWT token obtained from login endpoint",placeholder:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},globalHeaders:{"Content-Type":"application/json",Accept:"application/json"},categories:["Authentication","Products","Orders","Users","Cart","Payments"],rateLimit:{requests:100,period:"1 minute"},endpoints:[{id:"auth-login",name:"User Login",method:"POST",path:"/auth/login",category:"Authentication",description:"Authenticate user and receive JWT token",authentication:{type:"none",required:!1},parameters:{body:{type:"json",description:"Login credentials",schema:{email:{type:"string",description:"User email address",required:!0,pattern:"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",example:"user@example.com"},password:{type:"string",description:"User password",required:!0,min:8,example:"SecurePass123!"}},example:{email:"demo@example.com",password:"DemoPass123!"}}},examples:[{request:{body:{email:"demo@example.com",password:"DemoPass123!"}},response:{status:200,body:{success:!0,data:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",expiresIn:3600,user:{id:1,email:"demo@example.com",name:"Demo User"}}}}}]},{id:"auth-register",name:"User Registration",method:"POST",path:"/auth/register",category:"Authentication",description:"Register a new user account",authentication:{type:"none",required:!1},parameters:{body:{type:"json",schema:{email:{type:"string",required:!0,pattern:"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",description:"User email"},password:{type:"string",required:!0,min:8,description:"User password (min 8 characters)"},name:{type:"string",required:!0,description:"User full name"}},example:{email:"newuser@example.com",password:"SecurePass123!",name:"New User"}}}},{id:"get-products",name:"Get Products",method:"GET",path:"/products",category:"Products",description:"Retrieve paginated list of products with optional filtering",authentication:{type:"bearer",required:!1},parameters:{query:{page:{type:"integer",default:1,min:1,description:"Page number for pagination",example:1},limit:{type:"integer",default:10,min:1,max:100,description:"Number of items per page",example:10},category:{type:"string",required:!1,description:"Filter by category slug",example:"electronics"},search:{type:"string",required:!1,description:"Search products by name or description",example:"laptop"},minPrice:{type:"number",required:!1,min:0,description:"Minimum price filter",example:100},maxPrice:{type:"number",required:!1,description:"Maximum price filter",example:1e3},sortBy:{type:"string",enum:["price","name","createdAt","popularity"],default:"createdAt",description:"Sort field"},order:{type:"string",enum:["asc","desc"],default:"desc",description:"Sort order"}}},examples:[{request:{query:{page:1,limit:10,category:"electronics"}},response:{status:200,body:{success:!0,data:[{id:1,name:"Laptop Pro 15",description:"High-performance laptop for professionals",price:1299.99,category:"electronics",stock:45,imageUrl:"https://example.com/images/laptop.jpg",createdAt:"2025-01-15T10:00:00Z"}],meta:{total:150,page:1,limit:10,totalPages:15}}}}]},{id:"get-product-by-id",name:"Get Product by ID",method:"GET",path:"/products/{id}",category:"Products",description:"Get detailed information about a specific product",parameters:{path:{id:{type:"integer",required:!0,description:"Product ID",example:1}}},examples:[{request:{path:{id:1}},response:{status:200,body:{success:!0,data:{id:1,name:"Laptop Pro 15",description:"High-performance laptop for professionals",price:1299.99,category:"electronics",stock:45,specifications:{cpu:"Intel Core i7",ram:"16GB",storage:"512GB SSD"},reviews:{average:4.5,count:128}}}}}]},{id:"create-order",name:"Create Order",method:"POST",path:"/orders",category:"Orders",description:"Create a new order from cart items",authentication:{type:"bearer",required:!0},parameters:{body:{type:"json",schema:{items:{type:"array",required:!0,description:"Array of order items"},shippingAddress:{type:"object",required:!0,description:"Shipping address details"},paymentMethod:{type:"string",enum:["credit_card","paypal","stripe"],required:!0,description:"Payment method"}},example:{items:[{productId:1,quantity:2},{productId:5,quantity:1}],shippingAddress:{street:"123 Main St",city:"New York",state:"NY",zipCode:"10001",country:"USA"},paymentMethod:"credit_card"}}}},{id:"get-orders",name:"Get User Orders",method:"GET",path:"/orders",category:"Orders",description:"Get all orders for authenticated user",authentication:{type:"bearer",required:!0},parameters:{query:{status:{type:"string",enum:["pending","processing","shipped","delivered","cancelled"],required:!1,description:"Filter by order status"},page:{type:"integer",default:1,description:"Page number"},limit:{type:"integer",default:10,description:"Items per page"}}}},{id:"get-cart",name:"Get Cart",method:"GET",path:"/cart",category:"Cart",description:"Get current user cart",authentication:{type:"bearer",required:!0}},{id:"add-to-cart",name:"Add to Cart",method:"POST",path:"/cart/items",category:"Cart",description:"Add product to cart",authentication:{type:"bearer",required:!0},parameters:{body:{type:"json",schema:{productId:{type:"integer",required:!0,description:"Product ID to add"},quantity:{type:"integer",required:!0,min:1,description:"Quantity to add"}},example:{productId:1,quantity:2}}}},{id:"get-profile",name:"Get User Profile",method:"GET",path:"/users/me",category:"Users",description:"Get authenticated user profile",authentication:{type:"bearer",required:!0}},{id:"update-profile",name:"Update Profile",method:"PUT",path:"/users/me",category:"Users",description:"Update user profile information",authentication:{type:"bearer",required:!0},parameters:{body:{type:"json",schema:{name:{type:"string",required:!1,description:"User full name"},phone:{type:"string",required:!1,description:"Phone number"},avatar:{type:"string",required:!1,description:"Avatar URL"}}}}}]},L={id:"fastapi-template",name:"FastAPI Template",baseUrl:"https://api.fastapi-template.example.com/api/v1",version:"1.0.0",description:"Professional FastAPI template with SQLModel, async operations, Docker deployment, and comprehensive testing suite.",documentation:"https://docs.fastapi-template.example.com",repositoryUrl:"https://github.com/yourusername/fastapi-professional-template",authentication:{type:"bearer",required:!0,tokenEndpoint:"/auth/token",description:"OAuth2 password bearer token",placeholder:"your-access-token-here"},globalHeaders:{"Content-Type":"application/json",Accept:"application/json"},categories:["Authentication","Users","Items","Health"],rateLimit:{requests:60,period:"1 minute"},endpoints:[{id:"health-check",name:"Health Check",method:"GET",path:"/health",category:"Health",description:"Check API health status and database connectivity",authentication:{type:"none",required:!1},examples:[{response:{status:200,body:{status:"healthy",version:"1.0.0",database:"connected",uptime:86400}}}]},{id:"get-token",name:"Get Access Token",method:"POST",path:"/auth/token",category:"Authentication",description:"Obtain OAuth2 access token using credentials",authentication:{type:"none",required:!1},parameters:{body:{type:"formData",description:"OAuth2 form data",schema:{username:{type:"string",required:!0,description:"User email or username",example:"admin@example.com"},password:{type:"string",required:!0,description:"User password",example:"admin123"},grant_type:{type:"string",default:"password",description:"OAuth2 grant type"}}},headers:{"Content-Type":{type:"string",default:"application/x-www-form-urlencoded",description:"Content type for form data"}}},examples:[{request:{body:{username:"admin@example.com",password:"admin123",grant_type:"password"}},response:{status:200,body:{access_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",token_type:"bearer",expires_in:3600}}}]},{id:"get-users",name:"List Users",method:"GET",path:"/users",category:"Users",description:"Get paginated list of users",authentication:{type:"bearer",required:!0},parameters:{query:{skip:{type:"integer",default:0,min:0,description:"Number of records to skip"},limit:{type:"integer",default:100,min:1,max:100,description:"Maximum number of records to return"}}},examples:[{request:{query:{skip:0,limit:10}},response:{status:200,body:[{id:1,email:"user@example.com",full_name:"John Doe",is_active:!0,is_superuser:!1,created_at:"2025-01-01T00:00:00Z"}]}}]},{id:"create-user",name:"Create User",method:"POST",path:"/users",category:"Users",description:"Create a new user account",authentication:{type:"bearer",required:!0},parameters:{body:{type:"json",schema:{email:{type:"string",required:!0,pattern:"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",description:"User email address",example:"newuser@example.com"},password:{type:"string",required:!0,min:8,description:"User password (minimum 8 characters)",example:"SecurePass123!"},full_name:{type:"string",required:!1,description:"User full name",example:"Jane Smith"},is_active:{type:"boolean",default:!0,description:"Whether user account is active"},is_superuser:{type:"boolean",default:!1,description:"Whether user has superuser privileges"}},example:{email:"newuser@example.com",password:"SecurePass123!",full_name:"Jane Smith",is_active:!0,is_superuser:!1}}}},{id:"get-user-me",name:"Get Current User",method:"GET",path:"/users/me",category:"Users",description:"Get currently authenticated user information",authentication:{type:"bearer",required:!0},examples:[{response:{status:200,body:{id:1,email:"user@example.com",full_name:"John Doe",is_active:!0,is_superuser:!1}}}]},{id:"update-user-me",name:"Update Current User",method:"PUT",path:"/users/me",category:"Users",description:"Update currently authenticated user information",authentication:{type:"bearer",required:!0},parameters:{body:{type:"json",schema:{full_name:{type:"string",required:!1,description:"Updated full name"},email:{type:"string",required:!1,description:"Updated email address"},password:{type:"string",required:!1,min:8,description:"New password"}}}}},{id:"get-user-by-id",name:"Get User by ID",method:"GET",path:"/users/{user_id}",category:"Users",description:"Get specific user by ID",authentication:{type:"bearer",required:!0},parameters:{path:{user_id:{type:"integer",required:!0,description:"User ID",example:1}}}},{id:"get-items",name:"List Items",method:"GET",path:"/items",category:"Items",description:"Get paginated list of items",authentication:{type:"bearer",required:!0},parameters:{query:{skip:{type:"integer",default:0,description:"Number of records to skip"},limit:{type:"integer",default:100,max:100,description:"Maximum number of records"}}}},{id:"create-item",name:"Create Item",method:"POST",path:"/items",category:"Items",description:"Create a new item",authentication:{type:"bearer",required:!0},parameters:{body:{type:"json",schema:{title:{type:"string",required:!0,description:"Item title",example:"My New Item"},description:{type:"string",required:!1,description:"Item description",example:"This is a sample item"}},example:{title:"My New Item",description:"This is a sample item"}}}},{id:"get-item-by-id",name:"Get Item by ID",method:"GET",path:"/items/{item_id}",category:"Items",description:"Get specific item by ID",authentication:{type:"bearer",required:!0},parameters:{path:{item_id:{type:"integer",required:!0,description:"Item ID",example:1}}}},{id:"update-item",name:"Update Item",method:"PUT",path:"/items/{item_id}",category:"Items",description:"Update existing item",authentication:{type:"bearer",required:!0},parameters:{path:{item_id:{type:"integer",required:!0,description:"Item ID"}},body:{type:"json",schema:{title:{type:"string",required:!1,description:"Updated title"},description:{type:"string",required:!1,description:"Updated description"}}}}},{id:"delete-item",name:"Delete Item",method:"DELETE",path:"/items/{item_id}",category:"Items",description:"Delete an item",authentication:{type:"bearer",required:!0},parameters:{path:{item_id:{type:"integer",required:!0,description:"Item ID to delete"}}}}]},M={id:"finance-mcp",name:"Finance MCP API",baseUrl:"https://api.finance-mcp.example.com/v1",version:"1.0.0",description:"Real-time market data and financial information API with comprehensive stock, crypto, and forex data.",documentation:"https://docs.finance-mcp.example.com",repositoryUrl:"https://github.com/yourusername/market-mcp",authentication:{type:"apiKey",required:!0,location:"header",parameterName:"X-API-Key",description:"API key for authentication",placeholder:"your-api-key-here"},globalHeaders:{"Content-Type":"application/json",Accept:"application/json"},categories:["Market Data","Stocks","Crypto","News","Analytics"],rateLimit:{requests:100,period:"1 minute"},endpoints:[{id:"get-market-status",name:"Get Market Status",method:"GET",path:"/market/status",category:"Market Data",description:"Get current market status and trading hours",authentication:{type:"apiKey",required:!0,location:"header",parameterName:"X-API-Key"},examples:[{response:{status:200,body:{status:"open",market:"NYSE",timezone:"America/New_York",currentTime:"2025-01-20T14:30:00Z",marketOpen:"09:30:00",marketClose:"16:00:00",isHoliday:!1}}}]},{id:"get-market-overview",name:"Get Market Overview",method:"GET",path:"/market/overview",category:"Market Data",description:"Get overview of major market indices",authentication:{type:"apiKey",required:!0,location:"header",parameterName:"X-API-Key"},examples:[{response:{status:200,body:{indices:[{symbol:"SPX",name:"S&P 500",value:4783.45,change:45.23,changePercent:.95},{symbol:"DJI",name:"Dow Jones",value:37863.8,change:-125.5,changePercent:-.33}],timestamp:"2025-01-20T14:30:00Z"}}}]},{id:"get-stock-quote",name:"Get Stock Quote",method:"GET",path:"/stocks/{symbol}/quote",category:"Stocks",description:"Get real-time stock quote for a specific symbol",authentication:{type:"apiKey",required:!0,location:"header",parameterName:"X-API-Key"},parameters:{path:{symbol:{type:"string",required:!0,description:"Stock symbol (e.g., AAPL, GOOGL)",example:"AAPL"}}},examples:[{request:{path:{symbol:"AAPL"}},response:{status:200,body:{symbol:"AAPL",name:"Apple Inc.",price:185.92,change:2.45,changePercent:1.34,volume:52847392,marketCap:2891e9,pe_ratio:30.45,week52High:199.62,week52Low:124.17,timestamp:"2025-01-20T14:30:00Z"}}}]},{id:"get-stock-history",name:"Get Stock Historical Data",method:"GET",path:"/stocks/{symbol}/history",category:"Stocks",description:"Get historical price data for a stock",authentication:{type:"apiKey",required:!0,location:"header",parameterName:"X-API-Key"},parameters:{path:{symbol:{type:"string",required:!0,description:"Stock symbol",example:"AAPL"}},query:{interval:{type:"string",enum:["1m","5m","15m","1h","1d","1w","1M"],default:"1d",description:"Data interval"},from:{type:"string",required:!1,description:"Start date (ISO 8601)",example:"2025-01-01"},to:{type:"string",required:!1,description:"End date (ISO 8601)",example:"2025-01-20"},limit:{type:"integer",default:100,max:1e3,description:"Maximum number of data points"}}},examples:[{request:{path:{symbol:"AAPL"},query:{interval:"1d",limit:5}},response:{status:200,body:{symbol:"AAPL",interval:"1d",data:[{timestamp:"2025-01-20T00:00:00Z",open:183.5,high:186.4,low:182.9,close:185.92,volume:52847392},{timestamp:"2025-01-19T00:00:00Z",open:181.25,high:184.15,low:180.8,close:183.47,volume:48932154}]}}}]},{id:"search-stocks",name:"Search Stocks",method:"GET",path:"/stocks/search",category:"Stocks",description:"Search for stocks by symbol or company name",authentication:{type:"apiKey",required:!0,location:"header",parameterName:"X-API-Key"},parameters:{query:{q:{type:"string",required:!0,description:"Search query (symbol or company name)",example:"apple"},limit:{type:"integer",default:10,max:50,description:"Maximum number of results"}}},examples:[{request:{query:{q:"apple",limit:5}},response:{status:200,body:{results:[{symbol:"AAPL",name:"Apple Inc.",exchange:"NASDAQ",type:"Common Stock"}]}}}]},{id:"get-crypto-quote",name:"Get Crypto Quote",method:"GET",path:"/crypto/{symbol}/quote",category:"Crypto",description:"Get real-time cryptocurrency quote",authentication:{type:"apiKey",required:!0,location:"header",parameterName:"X-API-Key"},parameters:{path:{symbol:{type:"string",required:!0,description:"Crypto symbol (e.g., BTC, ETH)",example:"BTC"}},query:{currency:{type:"string",default:"USD",enum:["USD","EUR","GBP","JPY"],description:"Quote currency"}}},examples:[{request:{path:{symbol:"BTC"},query:{currency:"USD"}},response:{status:200,body:{symbol:"BTC",name:"Bitcoin",price:43250.75,change24h:1250.3,changePercent24h:2.98,volume24h:285e8,marketCap:845e9,circulatingSupply:19543218,currency:"USD",timestamp:"2025-01-20T14:30:00Z"}}}]},{id:"get-top-cryptos",name:"Get Top Cryptocurrencies",method:"GET",path:"/crypto/top",category:"Crypto",description:"Get top cryptocurrencies by market cap",authentication:{type:"apiKey",required:!0,location:"header",parameterName:"X-API-Key"},parameters:{query:{limit:{type:"integer",default:10,max:100,description:"Number of cryptocurrencies to return"},currency:{type:"string",default:"USD",description:"Quote currency"}}}},{id:"get-market-news",name:"Get Market News",method:"GET",path:"/news",category:"News",description:"Get latest market news and updates",authentication:{type:"apiKey",required:!0,location:"header",parameterName:"X-API-Key"},parameters:{query:{category:{type:"string",enum:["general","stocks","crypto","forex","commodities"],default:"general",description:"News category"},limit:{type:"integer",default:10,max:50,description:"Number of news items"},since:{type:"string",required:!1,description:"Get news since timestamp (ISO 8601)"}}},examples:[{request:{query:{category:"stocks",limit:5}},response:{status:200,body:{news:[{id:"12345",title:"Tech Stocks Rally on Strong Earnings",summary:"Major tech companies beat earnings expectations...",url:"https://example.com/news/12345",source:"Financial Times",publishedAt:"2025-01-20T12:00:00Z",sentiment:"positive",relatedSymbols:["AAPL","GOOGL","MSFT"]}]}}}]},{id:"get-stock-news",name:"Get Stock News",method:"GET",path:"/stocks/{symbol}/news",category:"News",description:"Get news related to a specific stock",authentication:{type:"apiKey",required:!0,location:"header",parameterName:"X-API-Key"},parameters:{path:{symbol:{type:"string",required:!0,description:"Stock symbol",example:"AAPL"}},query:{limit:{type:"integer",default:10,max:50,description:"Number of news items"}}}},{id:"get-technical-indicators",name:"Get Technical Indicators",method:"GET",path:"/analytics/indicators/{symbol}",category:"Analytics",description:"Get technical indicators for a stock",authentication:{type:"apiKey",required:!0,location:"header",parameterName:"X-API-Key"},parameters:{path:{symbol:{type:"string",required:!0,description:"Stock symbol",example:"AAPL"}},query:{indicators:{type:"string",required:!1,description:"Comma-separated list of indicators (RSI,MACD,SMA,EMA)",example:"RSI,MACD,SMA"},interval:{type:"string",enum:["1d","1w","1M"],default:"1d",description:"Data interval"}}},examples:[{request:{path:{symbol:"AAPL"},query:{indicators:"RSI,MACD",interval:"1d"}},response:{status:200,body:{symbol:"AAPL",interval:"1d",indicators:{RSI:{value:58.34,signal:"neutral"},MACD:{macd:2.45,signal:2.12,histogram:.33,trend:"bullish"}},timestamp:"2025-01-20T14:30:00Z"}}}]}]},U=[H,L,M];function j(a){return U.find(e=>e.id===a)}class w{currentAPI;currentEndpoint;requestHistory=[];constructor(){this.initEventListeners(),this.loadDefaultAPI(),this.initResponseViewer()}initEventListeners(){document.querySelector("[data-api-select]")?.addEventListener("change",o=>{const i=o.target.value;this.loadAPI(i)}),document.querySelector("[data-endpoint-select]")?.addEventListener("change",o=>{const i=o.target.value;this.loadEndpoint(i)}),document.querySelector("[data-send-request]")?.addEventListener("click",()=>this.sendRequest()),document.querySelector("[data-clear-request]")?.addEventListener("click",()=>this.clearRequest()),document.querySelector("[data-generate-code]")?.addEventListener("click",()=>this.generateRequestCode())}loadDefaultAPI(){const e=document.querySelector("[data-api-select]");e?.value&&this.loadAPI(e.value)}loadAPI(e){if(this.currentAPI=j(e),!this.currentAPI)return;const t=document.querySelector("[data-endpoint-select]");t&&(t.innerHTML='<option value="">Select an endpoint...</option>',this.currentAPI.endpoints.forEach(r=>{const s=document.createElement("option");s.value=r.id,s.textContent=`${r.method} ${r.name}`,t.appendChild(s)}))}loadEndpoint(e){if(!this.currentAPI||(this.currentEndpoint=this.currentAPI.endpoints.find(s=>s.id===e),!this.currentEndpoint))return;const t=document.querySelector("[data-method-select]");t&&(t.value=this.currentEndpoint.method);const r=document.querySelector("[data-url-input]");if(r){const s=`${this.currentAPI.baseUrl}${this.currentEndpoint.path}`;r.value=s}this.loadParameters()}loadParameters(){this.currentEndpoint}generateRequestCode(){if(!this.currentAPI||!this.currentEndpoint){alert("Please select an API and endpoint first");return}const t=document.querySelector("[data-code-language]")?.value;if(!t){alert("Please select a programming language");return}try{const r=f(this.currentAPI,this.currentEndpoint,{pathParams:{},queryParams:{},authentication:this.getCurrentAuthentication()}),s=v(r,t);this.displayGeneratedCode(s,t)}catch(r){console.error("Failed to generate code:",r),alert("Failed to generate code. Please check your request configuration.")}}getCurrentAuthentication(){const e=document.querySelector("[data-auth-type]")?.value,t=document.querySelector("[data-auth-token]")?.value;if(e&&e!=="none"&&t)return{type:e,token:t}}displayGeneratedCode(e,t){const r=document.querySelector("#generated-code-container");r&&(r.innerHTML=`
        <div class="code-block">
          <div class="code-block-header">
            <span class="code-block-title">Generated Request Code</span>
            <span class="code-block-language">${t}</span>
            <button type="button" class="code-block-copy" data-copy-generated-code>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 2h7v1H4V2zm0 3h7v1H4V5zm0 3h5v1H4V8z" />
              </svg>
              Copy
            </button>
          </div>
          <div class="code-block-content" style="max-height: 400px">
            <pre class="code-pre" data-language="${t}"><code class="code-text" data-generated-code="${this.escapeHtml(e)}">${this.escapeHtml(e)}</code></pre>
          </div>
        </div>
      `,this.initGeneratedCodeCopy())}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}initGeneratedCodeCopy(){const e=document.querySelector("[data-copy-generated-code]");e&&e.addEventListener("click",async()=>{const t=document.querySelector("[data-generated-code]");if(!t)return;const r=t.dataset.generatedCode||"";if(await this.copyToClipboard(r)){const n=e.innerHTML;e.innerHTML="✓ Copied!",setTimeout(()=>{e.innerHTML=n},2e3)}})}async sendRequest(){if(!this.currentAPI||!this.currentEndpoint){alert("Please select an API and endpoint");return}const e=document.querySelector("[data-auth-type]")?.value,t=document.querySelector("[data-auth-token]")?.value,r=f(this.currentAPI,this.currentEndpoint,{pathParams:{},queryParams:{},authentication:e!=="none"?{type:e,token:t}:void 0}),s=document.querySelector("[data-send-request]");s.disabled=!0,s.textContent="Sending...";try{const n=await q.executeRequest(r);this.requestHistory.push(n),this.displayResponse(n)}catch(n){console.error("Request failed:",n)}finally{s.disabled=!1,s.innerHTML='<span class="btn-icon">🚀</span> Send Request'}}initResponseViewer(){}displayResponse(e){this.showResponseComponents(),this.updateStatusIndicator(e),this.updateMetricsPanel(e),this.updateResponseContent(e)}showResponseComponents(){const e=document.getElementById("response-empty-state");e&&(e.style.display="none");const t=document.getElementById("response-status-container"),r=document.getElementById("response-metrics-container"),s=document.getElementById("response-tabs-container");t&&(t.style.display="block"),r&&(r.style.display="block"),s&&(s.style.display="block")}updateStatusIndicator(e){const t=document.getElementById("response-status-container");if(!t)return;const r=e.response?.status,s=e.response?.statusText,n=t.querySelector(".status-indicator");n&&(n.innerHTML=this.createStatusIndicatorHTML(r,s))}createStatusIndicatorHTML(e,t){const r=this.getStatusInfo(e);return`
        <div class="status-code">${e||"---"}</div>
        <div class="status-details">
          <div class="status-text">${t||r.category}</div>
          <div class="status-description">${r.description}</div>
        </div>
      `}getStatusInfo(e){return e?e>=200&&e<300?{category:"Success",color:"green",description:"Request succeeded"}:e>=300&&e<400?{category:"Redirect",color:"blue",description:"Request redirected"}:e>=400&&e<500?{category:"Client Error",color:"orange",description:"Client-side error"}:e>=500?{category:"Server Error",color:"red",description:"Server-side error"}:{category:"Unknown",color:"gray",description:"Unknown status"}:{category:"Pending",color:"gray",description:"No request sent"}}updateMetricsPanel(e){const t=document.getElementById("response-metrics-container");if(!t)return;const r=t.querySelector(".metrics-panel");r&&(r.innerHTML=this.createMetricsPanelHTML(e))}createMetricsPanelHTML(e){const t=this.getResponseSize(e);return`
        <div class="metrics-grid">
          <div class="metric-item metric-${this.getDurationColor(e.metrics.duration)}">
            <div class="metric-icon">⚡</div>
            <div class="metric-content">
              <div class="metric-label">Duration</div>
              <div class="metric-value">${this.formatDuration(e.metrics.duration)}</div>
            </div>
          </div>
          <div class="metric-item">
            <div class="metric-icon">📦</div>
            <div class="metric-content">
              <div class="metric-label">Size</div>
              <div class="metric-value">${t?this.formatSize(t):"--"}</div>
            </div>
          </div>
          <div class="metric-item">
            <div class="metric-icon">🕐</div>
            <div class="metric-content">
              <div class="metric-label">Time</div>
              <div class="metric-value">${new Date(e.timestamp).toLocaleTimeString()}</div>
            </div>
          </div>
          ${e.metrics.cached?`
            <div class="metric-item metric-cached">
              <div class="metric-icon">💾</div>
              <div class="metric-content">
                <div class="metric-label">Cache</div>
                <div class="metric-value">HIT</div>
              </div>
            </div>
          `:""}
        </div>
      `}getResponseSize(e){if(!e.response)return;const t=e.response.body?JSON.stringify(e.response.body).length:0,r=Object.entries(e.response.headers||{}).reduce((s,[n,o])=>s+n.length+o.length,0);return t+r}updateResponseContent(e){this.updateResponseBodyContent(e),this.updateResponseHeadersContent(e),this.initResponseCodeGeneration()}updateResponseBodyContent(e){const t=document.getElementById("response-body-content");if(!t)return;const r=e.response?.body;if(r){const s=JSON.stringify(r,null,2);t.innerHTML=`
          <div class="json-viewer">
            <pre class="json-content">${this.escapeHtml(s)}</pre>
          </div>
        `}else t.innerHTML='<div class="empty-body"><p>No response body</p></div>'}updateResponseHeadersContent(e){const t=document.getElementById("response-headers-content");if(!t)return;const r=e.response?.headers;if(r&&Object.keys(r).length>0){const s=Object.entries(r).map(([n,o])=>`
            <tr class="header-row">
              <td class="header-name"><code>${this.escapeHtml(n)}</code></td>
              <td class="header-value"><code>${this.escapeHtml(o)}</code></td>
              <td class="header-actions">
                <button type="button" class="copy-header-btn" data-copy-header="${this.escapeHtml(`${n}: ${o}`)}" title="Copy Header">📋</button>
              </td>
            </tr>
          `).join("");t.innerHTML=`
          <div class="headers-table">
            <table>
              <thead>
                <tr><th>Header</th><th>Value</th><th>Actions</th></tr>
              </thead>
              <tbody>${s}</tbody>
            </table>
          </div>
        `}else t.innerHTML='<div class="empty-headers"><p>No response headers</p></div>'}updateResponseViewer(e){const t=document.querySelector("[data-response-container]");if(!t)return;const r=this.createResponseViewerHTML(e);t.innerHTML=r,this.initResponseViewerController()}createResponseViewerHTML(e){const t=c=>{const d=document.createElement("div");return d.textContent=c,d.innerHTML},r=c=>c?(typeof c=="string"?c:JSON.stringify(c)).length>5e4:!1,s=(c,d=3)=>{if(d<=0)return"[Object]";if(Array.isArray(c))return c.length>100?[...c.slice(0,50),`... ${c.length-50} more items ...`,...c.slice(-25)]:c.map(l=>typeof l=="object"?s(l,d-1):l);if(c&&typeof c=="object"){const l=Object.keys(c);if(l.length>50){const m={};return l.slice(0,25).forEach(y=>{m[y]=typeof c[y]=="object"?s(c[y],d-1):c[y]}),m["..."]=`${l.length-25} more properties`,l.slice(-10).forEach(y=>{m[y]=typeof c[y]=="object"?s(c[y],d-1):c[y]}),m}const g={};return l.forEach(m=>{g[m]=typeof c[m]=="object"?s(c[m],d-1):c[m]}),g}return c},o=(()=>{if(!e.response)return;const c=e.response.body?JSON.stringify(e.response.body).length:0,d=Object.entries(e.response.headers||{}).reduce((l,[g,m])=>l+g.length+m.length,0);return c+d})(),i=e.response?.body&&r(e.response.body),p=i&&e.response?s(e.response.body,3):e.response?.body,h=p?JSON.stringify(p,null,2):"",u=JSON.stringify({status:e.response?.status,statusText:e.response?.statusText,headers:e.response?.headers,body:e.response?.body},null,2),b=e.response?.headers?Object.entries(e.response.headers).map(([c,d])=>`
            <tr class="header-row" data-header-name="${c.toLowerCase()}">
              <td class="header-name"><code>${t(c)}</code></td>
              <td class="header-value"><code>${t(d)}</code></td>
              <td class="header-actions">
                <button type="button" class="copy-header-btn" data-copy-header="${t(`${c}: ${d}`)}" title="Copy Header">📋</button>
              </td>
            </tr>
          `).join(""):"";return`
        <div class="response-viewer" data-response-viewer>
          <div class="response-content">
            <div class="response-header">
              <div class="status-indicator status-${this.getStatusColor(e.response?.status)}">
                <div class="status-code">${e.response?.status||"---"}</div>
                <div class="status-details">
                  <div class="status-text">${e.response?.statusText||this.getStatusCategory(e.response?.status)}</div>
                  <div class="status-description">${this.getStatusDescription(e.response?.status)}</div>
                </div>
              </div>
              <div class="header-actions">
                <button type="button" class="export-btn" data-export-response title="Export Response">📥 Export</button>
                <button type="button" class="clear-btn" data-clear-response title="Clear Response">🗑️ Clear</button>
              </div>
            </div>

            <!-- Metrics Panel -->
            <div class="metrics-panel">
              <div class="metrics-grid">
                <div class="metric-item metric-${this.getDurationColor(e.metrics.duration)}">
                  <div class="metric-icon">⚡</div>
                  <div class="metric-content">
                    <div class="metric-label">Duration</div>
                    <div class="metric-value">${this.formatDuration(e.metrics.duration)}</div>
                  </div>
                </div>
                <div class="metric-item">
                  <div class="metric-icon">📦</div>
                  <div class="metric-content">
                    <div class="metric-label">Size</div>
                    <div class="metric-value">${o?this.formatSize(o):"--"}</div>
                  </div>
                </div>
                <div class="metric-item">
                  <div class="metric-icon">🕐</div>
                  <div class="metric-content">
                    <div class="metric-label">Time</div>
                    <div class="metric-value">${new Date(e.timestamp).toLocaleTimeString()}</div>
                  </div>
                </div>
                ${e.metrics.cached?`
                  <div class="metric-item metric-cached">
                    <div class="metric-icon">💾</div>
                    <div class="metric-content">
                      <div class="metric-label">Cache</div>
                      <div class="metric-value">HIT</div>
                    </div>
                  </div>
                `:""}
              </div>
            </div>

            <div class="response-tabs-container">
              <div class="tab-panel" data-tab-panel>
                <div class="tab-buttons">
                  <button class="tab-button tab-button-active" data-tab-button="body">
                    <span class="tab-icon">📄</span> Body
                  </button>
                  <button class="tab-button" data-tab-button="headers">
                    <span class="tab-icon">📋</span> Headers
                  </button>
                  <button class="tab-button" data-tab-button="raw">
                    <span class="tab-icon">📝</span> Raw
                  </button>
                </div>

                <div class="tab-content tab-content-active" data-tab-panel-content="body">
                  <div class="tab-header">
                    <h4 class="tab-title">Response Body</h4>
                    <div class="tab-actions">
                      ${i?`
                        <div class="size-indicator">
                          <span class="size-badge size-large">
                            📊 Large Response (${this.formatSize(o||0)})
                          </span>
                        </div>
                        <button type="button" class="expand-btn" data-expand-all title="Show Full Response">
                          🔍 Show Full
                        </button>
                      `:""}
                      <button type="button" class="copy-btn" data-copy-body title="Copy Body">📋 Copy</button>
                      <button type="button" class="format-btn" data-format-toggle title="Toggle Format">🎨 Format</button>
                    </div>
                  </div>
                  <div class="response-body-container">
                    ${h?`
                      <div class="json-viewer">
                        ${i?`
                          <div class="performance-warning">
                            <div class="warning-icon">⚠️</div>
                            <div class="warning-content">
                              <strong>Large Response Detected</strong>
                              <p>This response has been truncated for performance. Click "Show Full" to see the complete data.</p>
                            </div>
                          </div>
                        `:""}
                        <pre class="json-content" data-json-content data-is-large="${i}" data-original-size="${o||0}">${t(h)}</pre>
                      </div>
                    `:`
                      <div class="empty-body">
                        <p>No response body</p>
                      </div>
                    `}
                  </div>
                </div>

                <div class="tab-content" data-tab-panel-content="headers">
                  <div class="tab-header">
                    <h4 class="tab-title">Response Headers</h4>
                    <div class="tab-actions">
                      <button type="button" class="copy-btn" data-copy-headers title="Copy Headers">📋 Copy</button>
                      <input type="search" placeholder="Filter headers..." class="header-search" data-header-search />
                    </div>
                  </div>
                  <div class="headers-container">
                    ${b?`
                      <div class="headers-table">
                        <table>
                          <thead>
                            <tr><th>Header</th><th>Value</th><th>Actions</th></tr>
                          </thead>
                          <tbody data-headers-body>${b}</tbody>
                        </table>
                      </div>
                    `:`
                      <div class="empty-headers"><p>No response headers</p></div>
                    `}
                  </div>
                </div>

                <div class="tab-content" data-tab-panel-content="code-gen">
                  <div class="tab-header">
                    <h4 class="tab-title">Generated Code</h4>
                    <div class="tab-actions">
                      <select class="response-code-lang-select" data-response-code-language>
                        <option value="curl">cURL</option>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="go">Go</option>
                        <option value="php">PHP</option>
                        <option value="java">Java</option>
                        <option value="ruby">Ruby</option>
                      </select>
                      <button type="button" class="btn-generate-response" data-generate-response-code>🔄 Generate</button>
                    </div>
                  </div>
                  <div class="response-code-container" id="response-code-container">
                    <div class="empty-code-state">
                      <div class="empty-icon">💻</div>
                      <p>Select a language and click "Generate" to see the request code based on this response.</p>
                    </div>
                  </div>
                </div>

                <div class="tab-content" data-tab-panel-content="raw">
                  <div class="tab-header">
                    <h4 class="tab-title">Raw Response</h4>
                    <div class="tab-actions">
                      <button type="button" class="copy-btn" data-copy-raw title="Copy Raw">📋 Copy</button>
                      <button type="button" class="download-btn" data-download-response title="Download">💾 Download</button>
                      <button type="button" class="wrap-btn" data-toggle-wrap title="Toggle Text Wrap">🔄 Wrap</button>
                    </div>
                  </div>
                  <div class="raw-container">
                    <div class="raw-info">
                      <span class="info-item">Status: <strong>${e.response?.status} ${e.response?.statusText}</strong></span>
                      <span class="info-item">Size: <strong>${o?this.formatSize(o):"Unknown"}</strong></span>
                      <span class="info-item">Duration: <strong>${e.metrics.duration}ms</strong></span>
                    </div>
                    <div class="raw-content-container">
                      <pre class="raw-content" data-raw-content>${t(u)}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `}initResponseViewerController(){this.initCopyButtons(),this.initHeaderSearch(),this.initFormatToggle(),this.initExportButtons(),this.initTabPanel(),this.initLargeObjectHandlers(),this.initResponseCodeGeneration()}initResponseCodeGeneration(){const e=document.querySelector("[data-generate-response-code]");e&&e.addEventListener("click",()=>{this.generateResponseCode()})}generateResponseCode(){if(!this.currentAPI||!this.currentEndpoint)return;const t=document.querySelector("[data-response-code-language]")?.value;if(!t){alert("Please select a programming language");return}try{const r=f(this.currentAPI,this.currentEndpoint,{pathParams:{},queryParams:{},authentication:this.getCurrentAuthentication()}),s=v(r,t);this.displayResponseCode(s,t)}catch(r){console.error("Failed to generate response code:",r),alert("Failed to generate code. Please check your configuration.")}}displayResponseCode(e,t){const r=document.querySelector("#response-code-content");r&&(r.innerHTML=`
        <div class="code-block">
          <div class="code-block-header">
            <span class="code-block-title">Request Code</span>
            <span class="code-block-language">${t}</span>
            <button type="button" class="code-block-copy" data-copy-response-code>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 2h7v1H4V2zm0 3h7v1H4V5zm0 3h5v1H4V8z" />
              </svg>
              Copy
            </button>
          </div>
          <div class="code-block-content" style="max-height: 400px">
            <pre class="code-pre" data-language="${t}"><code class="code-text" data-response-code="${this.escapeHtml(e)}">${this.escapeHtml(e)}</code></pre>
          </div>
        </div>
      `,this.initResponseCodeCopy())}initResponseCodeCopy(){const e=document.querySelector("[data-copy-response-code]");e&&e.addEventListener("click",async()=>{const t=document.querySelector("[data-response-code]");if(!t)return;const r=t.dataset.responseCode||"";if(await this.copyToClipboard(r)){const n=e.innerHTML;e.innerHTML="✓ Copied!",setTimeout(()=>{e.innerHTML=n},2e3)}})}getStatusColor(e){return e?e>=200&&e<300?"green":e>=300&&e<400?"blue":e>=400&&e<500?"orange":e>=500?"red":"gray":"gray"}getStatusCategory(e){return e?e>=200&&e<300?"Success":e>=300&&e<400?"Redirect":e>=400&&e<500?"Client Error":e>=500?"Server Error":"Unknown":"Pending"}getStatusDescription(e){return e?e>=200&&e<300?"Request succeeded":e>=300&&e<400?"Request redirected":e>=400&&e<500?"Client-side error":e>=500?"Server-side error":"Unknown status":"No request sent"}getDurationColor(e){return e?e<100?"green":e<500?"blue":e<1e3?"orange":"red":"gray"}formatDuration(e){return!e&&e!==0?"--":e<1e3?`${Math.round(e)}ms`:`${(e/1e3).toFixed(2)}s`}formatSize(e){if(!e&&e!==0)return"--";if(e===0)return"0 B";const t=["B","KB","MB","GB"],r=Math.floor(Math.log(e)/Math.log(1024));return`${(e/Math.pow(1024,r)).toFixed(2)} ${t[r]}`}async copyToClipboard(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0;const t=document.createElement("textarea");return t.value=e,t.style.position="fixed",t.style.left="-999999px",t.style.top="-999999px",document.body.appendChild(t),t.focus(),t.select(),new Promise(r=>{try{const s=document.execCommand("copy");document.body.removeChild(t),r(s)}catch{document.body.removeChild(t),r(!1)}})}catch(t){return console.warn("Copy to clipboard failed:",t),!1}}showCopyFeedback(e){const t=e.innerHTML;e.innerHTML="✅ Copied!",e.style.color="var(--color-primary)",setTimeout(()=>{e.innerHTML=t,e.style.color=""},2e3)}initCopyButtons(){document.addEventListener("click",async e=>{const t=e.target;if(t.matches("[data-copy-body]")){const r=document.querySelector("[data-json-content]");r&&await this.copyToClipboard(r.textContent||"")&&this.showCopyFeedback(t)}if(t.matches("[data-copy-headers]")){const r=document.querySelectorAll(".header-row"),s=Array.from(r).map(o=>{const i=o.querySelector(".header-name code")?.textContent||"",p=o.querySelector(".header-value code")?.textContent||"";return`${i}: ${p}`}).join(`
`);await this.copyToClipboard(s)&&this.showCopyFeedback(t)}if(t.matches("[data-copy-header]")){const r=t.getAttribute("data-copy-header")||"";await this.copyToClipboard(r)&&this.showCopyFeedback(t)}if(t.matches("[data-copy-raw]")){const r=document.querySelector("[data-raw-content]");r&&await this.copyToClipboard(r.textContent||"")&&this.showCopyFeedback(t)}})}initHeaderSearch(){document.addEventListener("input",e=>{const t=e.target;if(t.matches("[data-header-search]")){const r=t.value.toLowerCase();document.querySelectorAll(".header-row").forEach(n=>{const i=(n.getAttribute("data-header-name")||"").includes(r)||r==="";n.style.display=i?"":"none"})}})}initFormatToggle(){document.addEventListener("click",e=>{const t=e.target;if(t.matches("[data-format-toggle]")){const r=document.querySelector("[data-json-content]");if(!r)return;r.style.whiteSpace!=="pre-line"?(r.style.whiteSpace="pre-line",t.textContent="📋 Minify"):(r.style.whiteSpace="pre",t.textContent="🎨 Format")}if(t.matches("[data-toggle-wrap]")){const r=document.querySelector("[data-raw-content]");if(!r)return;r.style.whiteSpace==="pre-wrap"?(r.style.whiteSpace="pre",t.textContent="🔄 Wrap"):(r.style.whiteSpace="pre-wrap",t.textContent="↩️ No Wrap")}})}initExportButtons(){document.addEventListener("click",async e=>{const t=e.target;if(t.matches("[data-download-response]")){const r=document.querySelector("[data-raw-content]");if(!r)return;const s=r.textContent||"",n=new Blob([s],{type:"application/json"}),o=URL.createObjectURL(n),i=document.createElement("a");i.href=o,i.download=`api-response-${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(o)}t.matches("[data-clear-response]")&&this.clearRequest()})}initTabPanel(){document.addEventListener("click",e=>{const r=e.target.closest("[data-tab-button]");if(r){const s=r.getAttribute("data-tab-button");if(!s)return;document.querySelectorAll(".tab-button").forEach(o=>{o.classList.remove("tab-button-active")}),r.classList.add("tab-button-active"),document.querySelectorAll(".tab-content").forEach(o=>{o.classList.remove("tab-content-active")});const n=document.querySelector(`[data-tab-panel-content="${s}"]`);n&&n.classList.add("tab-content-active")}})}initLargeObjectHandlers(){document.addEventListener("click",async t=>{const r=t.target;if(r.matches("[data-expand-all]")){const s=document.querySelector("[data-json-content]");if(!s||!(s.getAttribute("data-is-large")==="true"))return;const o=r.textContent;if(r.textContent="⏳ Loading...",r.disabled=!0,this.requestHistory.length>0){const i=this.requestHistory[this.requestHistory.length-1],p=i.response?.body?JSON.stringify(i.response.body,null,2):"";setTimeout(()=>{s.textContent=p,r.textContent="🔹 Show Less",r.setAttribute("data-collapse-all","true"),r.removeAttribute("data-expand-all"),r.disabled=!1;const h=document.querySelector(".performance-warning");h&&(h.style.display="none")},100)}else r.textContent=o,r.disabled=!1}if(r.matches("[data-collapse-all]")&&this.requestHistory.length>0){const s=this.requestHistory[this.requestHistory.length-1];this.updateResponseViewer(s)}}),document.querySelectorAll(".json-viewer").forEach(t=>{const r=t.querySelector(".response-body-container");r&&r.addEventListener("scroll",()=>{const{scrollTop:s,scrollHeight:n,clientHeight:o}=r;s+o>=n-100&&this.checkPerformanceThresholds(r)})})}checkPerformanceThresholds(e){const t=e.querySelector("[data-json-content]");if(!t)return;if((t.textContent?.length||0)>1e6){const s=e.querySelector(".performance-warning");if(s&&s instanceof HTMLElement){s.style.display="flex";const n=s.querySelector(".warning-content p");n&&(n.textContent="This is a very large response. Consider using pagination or filtering on the API side for better performance.")}}}clearRequest(){const e=document.querySelector("[data-url-input]");e&&(e.value="");const t=document.querySelector("#request-body-editor");t&&(t.value="");const r=document.querySelector("#generated-code-container");if(r){const p=r.querySelector(".empty-code-state");p&&(p.style.display="flex"),r.querySelectorAll(".code-block").forEach(u=>u.remove())}const s=document.getElementById("response-empty-state"),n=document.getElementById("response-status-container"),o=document.getElementById("response-metrics-container"),i=document.getElementById("response-tabs-container");s&&(s.style.display="block"),n&&(n.style.display="none"),o&&(o.style.display="none"),i&&(i.style.display="none")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{new w}):new w;
