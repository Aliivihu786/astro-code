import { EventStreamSerdeContext, SerdeContext } from '@smithy/types';
import { Stream as CoreStream } from '@agent-ai/sdk/streaming';
import { BaseAnthropic } from '@agent-ai/sdk';
export declare const toUtf8: (input: Uint8Array) => string;
export declare const fromUtf8: (input: string) => Uint8Array;
export declare const getMinimalSerdeContext: () => SerdeContext & EventStreamSerdeContext;
export declare class Stream<Item> extends CoreStream<Item> {
    static fromSSEResponse<Item>(response: Response, controller: AbortController, client?: BaseAnthropic): Stream<Item>;
}
//# sourceMappingURL=streaming.d.ts.map