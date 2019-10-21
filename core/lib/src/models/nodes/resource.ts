import { Node, DeserializedNode } from './node';

export class Resource extends Node {
  /** A user displayable description for the page. */
  description?: string;
  /** A URL which contains an icon for the page. */
  icon?: string;
  /** A URL which contains a preview image for the page. */
  image?: string;
  /** The meta keywords for the page. */
  keywords?: string[];
  /** A string representation of the sub and primary domains. */
  provider?: string;
  /** A user displayable title for the page. */
  title?: string;
  /** The type of content as defined by opengraph. */
  type?: string;
  /** A canonical URL for the page. */
  url?: string;
  /** Image height */
  imageHeight?: number;
  static serialize(node: DeserializedResource): Resource {
    const serialized = Node.serialize(node);
    return serialized;
  }
  static deserialize(node: Resource): DeserializedResource {
    const deserialized = Node.deserialize(node);
    return deserialized;
  }
}

export class DeserializedResource extends DeserializedNode {
  description?: string;
  icon?: string;
  image?: string;
  keywords?: string[];
  provider?: string;
  title?: string;
  type?: string;
  url?: string;
  imageHeight?: number;
}
