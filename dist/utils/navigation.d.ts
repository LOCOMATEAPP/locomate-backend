import { GraphNode, GraphEdge, NavigationResult } from '../types';
export declare const calculateDistance: (x1: number, y1: number, x2: number, y2: number) => number;
export declare const dijkstra: (nodes: GraphNode[], edges: GraphEdge[], startNodeId: string, endNodeId: string) => {
    path: string[];
    distance: number;
} | null;
export declare const buildNavigationGraph: (stores: Array<{
    id: string;
    coordinateX: number;
    coordinateY: number;
}>) => {
    nodes: GraphNode[];
    edges: GraphEdge[];
};
export declare const calculateNavigation: (startX: number, startY: number, stores: Array<{
    id: string;
    coordinateX: number;
    coordinateY: number;
}>, targetStoreId: string) => NavigationResult | null;
//# sourceMappingURL=navigation.d.ts.map