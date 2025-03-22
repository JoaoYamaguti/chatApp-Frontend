export default interface IMetrics {
  users:{total: number}
  messages: {
    total: number
    sender: number
  }
}
