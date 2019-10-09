import { Node, LinkNode, QueueNode } from './Node'

export class Link {
  header: LinkNode
  length: number

  constructor() {
    this.length = 0
    this.header = null
  }

  appendNode(node: LinkNode) {
    var current = null
    // 如果头节点不存在
    if (!this.header) {
      // 给头节点赋予初值
      this.header = node
    } else {
      // 头指针为初值
      current = this.header
      // 便利循环头指针，找到最后一个指针
      while (current.next) {
        current = current.next
      }
      // 最后一个指针的下一个指针为当前node
      current.setNext(node)
    }

    this.length++
  }

  /**
   * 删除一个节点，如果不传值则默认删除最后一个
   * @param {Integer} index - 删除的行数
   */
  removeNode(index: number) {
    if (index < 0 || index > this.length + 1) {
      console.error('越界啦')
      return
    }

    const {previous,current} = this.getNodeByIndex(index)

    previous.setNext(current)

    this.length--

    return this
  }

  getNodeByIndex(index:number){
    let c_index = 0 // 当前索引节点index
    let current = this.header // 当前节点
    let t_index = index || 0 // 目标索引
    var previous = null // 用来记录上一个节点，当当前节点删除了，将上个节点指向下个节点
    
    if (index === 0) {
      current = this.header
      previous = current
    } else {
      while (c_index++ < t_index) {
        previous = current
        current = current.next
      }
    }

    return {previous,current}
  }

  /**
   * 插入节点位置
   * @param {Integer} index - 节点插入位置
   * @param {LinkedNode} node - 节点
   */
  insertNode(index: number, node: LinkNode) {
    if (index < 0 || index > this.length + 1) {
      console.error('越界啦')
      return
    }

    let current = this.header
    let t_index = index
    let c_index = 0
    let previous = null
    if (t_index === 0) {
      node.setNext(current)
      this.header = node
    } else {
      while (c_index++ < t_index) {
        previous = current
        current = current.next
      }
      previous.setNext(node)
      node.setNext(current)
    }

    this.length++
    return this
  }
}

export class Queue extends Link {
  footer: QueueNode
  header: QueueNode
  constructor() {
    super()
    this.header = null
    this.footer = null
  }

  setHeader(node: QueueNode) {
    this.header = node
  }

  setFooter(node: QueueNode) {
    this.footer = node
  }

  appendNode(node: QueueNode) {
    super.appendNode(node)
    node.setPrev(this.footer)
    this.setFooter(node)
  }

  /**
   * 删除一个节点，如果不传值则默认删除最后一个
   * @param {Integer} index - 删除的行数
   */
  removeNode(index: number) {
    super.removeNode(index)
    this.header.setPrev(null)
    this.footer.setNext(null)
    return this
  }

}
