import { Injectable } from '@nestjs/common';

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

@Injectable()
export class AppService {

  private memo: Map<number, bigint> = new Map<number, bigint>();

  getQuestion1(n: number): string {
    return this.f(n).toString();
  }

  private f(n: number): bigint {
    if (n <= 0) {
      // Assume all positive number
      return BigInt(0);
    } else if (n === 1) {
      return BigInt(1);
    } else if (this.memo.has(n)) {
      // Memorize f(n) result to prevent recalculation
      return this.memo.get(n);
    } else {
      const result = this.f(n - 1) + this.f(n - 2);
      this.memo.set(n, result);
      return result
    }
  }

  getQuestion2(): number[][] {
    // Example Tree Root
    const root: TreeNode = {
      value: 1,
      left: {
        value: 2,
        left: { value: 4 },
        right: { value: 5 },
      },
      right: {
        value: 3,
        left: { value: 6 },
        right: { value: 7 },
      },
    };

    const nodesByDepth = this.getNodesByDepth(root);
    return nodesByDepth;
  }

  private getNodesByDepth(root: TreeNode): number[][] {
    // 0 for first level
    const queue: [TreeNode, number][] = [[root, 0]];
    const nodesByDepth: number[][] = [];
    while (queue.length > 0) {
      // BFS Search, we always search from left to right in the same level first 
      const [node, depth] = queue.shift()!;

      if (!nodesByDepth[depth]) {
        nodesByDepth[depth] = [];
      }
      nodesByDepth[depth].push(node.value);

      if (node.left) {
        queue.push([node.left, depth + 1]);
      }
      if (node.right) {
        queue.push([node.right, depth + 1]);
      }
    }

    return nodesByDepth;
  }

  getQuestion3(n: number): string {
    return BigInt(this.countPossibleWays(n)).toString();
  }

  private countPossibleWays(n: number): number {
    const ways: number[] = new Array(n + 1).fill(0);

    // Starting Point
    ways[0] = 1;

    // f(2) = f(0) + f(1) ; f(3) = f(0) + f(1) + f(2)
    // For example, n = 3, First Step we got f(1) way , Second Step we got f(2) way, including starting point, we have f(0) + f(1) + f(2) way for 3 Steps
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= 6 && j <= i; j++) {
        ways[i] += ways[i - j];
      }
    }
    return ways[n];
  }
}
