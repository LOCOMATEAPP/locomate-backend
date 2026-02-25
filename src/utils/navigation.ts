import { GraphNode, GraphEdge, NavigationResult, RouteStep } from '../types';

class PriorityQueue<T> {
  private items: { element: T; priority: number }[] = [];

  enqueue(element: T, priority: number): void {
    this.items.push({ element, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | undefined {
    return this.items.shift()?.element;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

export const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export const dijkstra = (
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNodeId: string,
  endNodeId: string
): { path: string[]; distance: number } | null => {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const queue = new PriorityQueue<string>();

  nodes.forEach((node) => {
    distances[node.id] = Infinity;
    previous[node.id] = null;
  });

  distances[startNodeId] = 0;
  queue.enqueue(startNodeId, 0);

  while (!queue.isEmpty()) {
    const currentId = queue.dequeue();
    if (!currentId) break;

    if (currentId === endNodeId) {
      const path: string[] = [];
      let current: string | null = endNodeId;
      while (current) {
        path.unshift(current);
        current = previous[current];
      }
      return { path, distance: distances[endNodeId] };
    }

    const currentEdges = edges.filter((e) => e.from === currentId);

    for (const edge of currentEdges) {
      const alt = distances[currentId] + edge.weight;
      if (alt < distances[edge.to]) {
        distances[edge.to] = alt;
        previous[edge.to] = currentId;
        queue.enqueue(edge.to, alt);
      }
    }
  }

  return null;
};

export const buildNavigationGraph = (
  stores: Array<{ id: string; coordinateX: number; coordinateY: number }>
): { nodes: GraphNode[]; edges: GraphEdge[] } => {
  const nodes: GraphNode[] = stores.map((store) => ({
    id: store.id,
    x: store.coordinateX,
    y: store.coordinateY,
    storeId: store.id,
  }));

  const edges: GraphEdge[] = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const distance = calculateDistance(
        nodes[i].x,
        nodes[i].y,
        nodes[j].x,
        nodes[j].y
      );

      edges.push({ from: nodes[i].id, to: nodes[j].id, weight: distance });
      edges.push({ from: nodes[j].id, to: nodes[i].id, weight: distance });
    }
  }

  return { nodes, edges };
};

export const calculateNavigation = (
  startX: number,
  startY: number,
  stores: Array<{ id: string; coordinateX: number; coordinateY: number }>,
  targetStoreId: string
): NavigationResult | null => {
  const startNode: GraphNode = {
    id: 'start',
    x: startX,
    y: startY,
  };

  const allNodes = [startNode, ...stores.map((s) => ({
    id: s.id,
    x: s.coordinateX,
    y: s.coordinateY,
    storeId: s.id,
  }))];

  const edges: GraphEdge[] = [];

  for (let i = 0; i < allNodes.length; i++) {
    for (let j = i + 1; j < allNodes.length; j++) {
      const distance = calculateDistance(
        allNodes[i].x,
        allNodes[i].y,
        allNodes[j].x,
        allNodes[j].y
      );

      edges.push({ from: allNodes[i].id, to: allNodes[j].id, weight: distance });
      edges.push({ from: allNodes[j].id, to: allNodes[i].id, weight: distance });
    }
  }

  const result = dijkstra(allNodes, edges, 'start', targetStoreId);

  if (!result) return null;

  const steps: RouteStep[] = result.path.map((nodeId) => {
    const node = allNodes.find((n) => n.id === nodeId);
    return {
      x: node!.x,
      y: node!.y,
      instruction: node!.storeId ? `Arrive at store` : 'Starting point',
    };
  });

  const avgWalkingSpeed = 1.4;
  const duration = Math.ceil(result.distance / avgWalkingSpeed);

  return {
    distance: Math.round(result.distance * 100) / 100,
    duration,
    steps,
  };
};
