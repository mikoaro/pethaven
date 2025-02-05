export type TransactionStatus =
  | "Draft"
  | "Checkout Sent"
  | "Pending Completion";

  export type Transaction = {

    id: string
  
    timeStarted: string
  
    user: string
  
    person: string
  
    items: string
  
    status: "Draft" | "Checkout Sent" | "Completed" | "Pending Completion"
  
  }
