export class MinHeap<T extends { weight: number }> {
  private heap: T[] = [];

  clone(): MinHeap<T> {
    const newHeap = new MinHeap<T>();
    newHeap.heap = [...this.heap];
    return newHeap;
  }

  insert(val: T) {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const top = this.heap[0];
    const end = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return top;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp() {
    let i = this.heap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.heap[i].weight < this.heap[p].weight) {
        [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
        i = p;
      } else break;
    }
  }

  private bubbleDown() {
    let i = 0;
    const length = this.heap.length;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let smallest = i;

      if (left < length && this.heap[left].weight < this.heap[smallest].weight)
        smallest = left;
      if (
        right < length &&
        this.heap[right].weight < this.heap[smallest].weight
      )
        smallest = right;

      if (smallest !== i) {
        [this.heap[i], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[i],
        ];
        i = smallest;
      } else break;
    }
  }
}
