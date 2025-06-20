---
title: 生成文本评估指标
createTime: 2025/06/09 11:43:42
permalink: /zh/guide/cazde3lz/
---

# 生成文本评估指标

## 概览


| 类别          | 打分器数量 | 描述                       |
| ----------- | ----- | ------------------------ |
| 基于词重叠  | 5     | 评估生成文本与参考文本的 n-gram 重叠程度 |
| 基于词向量  | 2     | 使用词向量计算生成文本与参考文本的相似性     |
| 基于语言模型 | 4     | 利用预训练语言模型评估文本的语义和流畅性     |
| 其他   | 2     | -    |

---


## 基于词重叠

| 打分器名称              | 评估维度       | 使用场景             | 实现方法                                                                                       | 取值范围         | 值解释                                      | 优点                              | 局限性                              |
| -------------------- | ------------ | ---------------- | ------------------------------------------------------------------------------------------ | ------------- | --------------------------------------- | --------------------------------- | --------------------------------- |
| BLEU Scorer          | 词汇匹配  | 机器翻译、文本生成      | 基于 n-gram 匹配的精确度计算，将生成文本中的 n-gram 与参考文本中的 n-gram 进行匹配并计算精确度                 | [0, 1]       | 值越大，表示生成文本与参考文本的匹配程度越高                  | 适用于大规模数据集，简单高效               | 在单句级别表现较差，对同义词及词序不敏感         |
| ROUGE Scorer         | 词汇匹配        | 文本摘要             | 基于 n-gram 和最长公共子序列匹配，计算生成摘要与参考摘要之间的重叠程度                                   | [0, 1]       | 值越大，表示生成文本与参考文本的内容重叠越多               | 简单易用，适用于评估多种文本生成任务         | 对文本内容的语义理解能力有限               |
| METEOR Scorer        | 词汇匹配        | 机器翻译             | 基于词形变化、同义词匹配以及语义相关性，综合计算生成文本与参考文本的对齐分数                              | [0, 1]       | 值越大，表示生成文本与参考文本在语义上越一致               | 对语义相似性更加敏感，比 BLEU 更接近人工评估  | 计算复杂度较高                      |
| CIDEr Scorer      | 内容相关性       | 图像描述生成          | 利用 TF-IDF 加权的 n-gram 统计，将生成文本的描述与参考描述进行相似性比较                               | [0, 1]       | 值越大，表示生成文本与参考文本在内容上越一致               | 考虑了参考文本中词汇的权重，适合图像到文本任务 | 对低频词的影响较大                     |
| CHRF Scorer    | 词汇匹配 | 机器翻译| 基于参考文本和评估文本的字符级n-gram匹配精确度和召回率计算chrF分数| [0, 1] | 值越大，表示语义相似性越强 | 可以更加细粒度理解 | 忽略语义信息 |
---

### 基于词向量

| 打分器名称                  | 评估维度       | 使用场景             | 实现方法                                                                                       | 取值范围         | 值解释                                      | 优点                              | 局限性                              |
| ----------------------- | ------------ | ---------------- | ------------------------------------------------------------------------------------------ | ------------- | --------------------------------------- | --------------------------------- | --------------------------------- |
| EmbeddingAverageScorer | 语义相似性       | 文本生成             | 对生成文本和参考文本的词向量取平均值，计算余弦相似度                                       | [0, 1]       | 值越大，表示语义相似性越强                       | 简单高效，适合快速计算                 | 无法捕捉复杂的语义结构                 |
| GreedyMatchingScorer   | 语义相关性       | 文本生成             | 匹配生成文本和参考文本中语义最相似的词，计算相似度                                       | [0, 1]       | 值越大，表示语义相关性越强                       | 捕捉局部相似性                      | 忽略全局语义结构                   |
---

### 基于语言模型

| 打分器名称          | 评估维度       | 使用场景             | 实现方法                                                                                       | 取值范围         | 值解释                                      | 优点                              | 局限性                              |
| ----------------- | ------------ | ---------------- | ------------------------------------------------------------------------------------------ | ------------- | --------------------------------------- | --------------------------------- | --------------------------------- |
| WSD Scorer              | 语义相似性       | 文本生成、语义相似性分析   | 使用 word2vec 模型计算生成文本与参考文本的词向量之间的 Word Mover's Distance (WMD)       | [0, +∞)      | 值越小，表示生成文本与参考文本的语义距离越近               | 能捕捉深层次的语义差异，适用于多种语言         | 对文本长度和停用词较敏感，计算复杂度较高        |
| BertScorer         | 语义相似性       | 文本生成             | 使用 Bert 模型计算生成文本与参考文本的词向量相似性，输出精确度、召回率和 F1 分数                         | [0, 1]       | 值越大，表示生成文本与参考文本在语义上越相似               | 能捕捉深层语义信息，适应多种语言            | 依赖预训练模型，计算时间较长              |
| BARTScorer         | 流畅性与信息性    | 文本生成             | 利用 BART 模型将生成文本视为目标，计算生成的可能性分数                                      | [-∞, +∞]     | 值越高，表示生成文本的质量越高                       | 能综合评估生成文本的多维质量               | 模型依赖性强                       |
| BELURT Scorer     | 语义相似性       | 文本生成、机器翻译       | 使用预训练语言模型（如 BERT）进行微调，以语义相似性任务为目标，计算生成文本与参考文本的相似性得分               | [0, 1]       | 值越高，表示生成文本与参考文本在语义上越一致               | 结合预训练语言模型的语义理解能力，能够捕捉深层语义信息 | 模型训练依赖于高质量数据，对领域变化敏感，且计算成本较高 |

---
### 其他

| 打分器名称          | 评估维度       | 使用场景             | 实现方法                                                                                       | 取值范围         | 值解释                                      | 优点                              | 局限性                              |
| ----------------- | ------------ | ---------------- | ------------------------------------------------------------------------------------------ | ------------- | --------------------------------------- | --------------------------------- | --------------------------------- |
| TER Scorer        | 编辑距离       | 机器翻译             | 计算生成文本转化为参考文本所需的最小编辑操作次数，包括插入、删除和替换                                  | [0, 1]       | 值越小，表示生成文本与参考文本越接近                    | 简单直观，适合机器翻译的误差分析           | 对语义信息缺乏敏感度                  |
| HLEPOR Scorer     | 多维度匹配       | 机器翻译             | 综合考虑多个权重参数（如位置、比例等），计算生成文本与参考文本在多个维度的匹配程度                            | [0, 1]       | 值越高，表示生成文本与参考文本的匹配程度越高               | 灵活性高，可调整权重参数以适应不同任务         | 参数选择对评估结果影响较大               |
