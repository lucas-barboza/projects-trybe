def exists_word(word, instance):
    response = []
    for i in instance.queue:
        occurrences = []
        for j, line in enumerate(i["linhas_do_arquivo"], 1):
            if line.lower().find(word.lower()) != -1:
                occurrences.append({"linha": j})
        if len(occurrences) > 0:
            response.append({
                "palavra": word,
                "arquivo": i["nome_do_arquivo"],
                "ocorrencias": occurrences
            })
    return response


def search_by_word(word, instance):
    results = []

    for file_info in range(len(instance)):
        occurrences = []

        file_data = instance.search(file_info)
        file_lines = file_data["linhas_do_arquivo"]
        file_name = file_data["nome_do_arquivo"]

        for line_number, file_lines in enumerate(file_lines, start=1):
            if word.lower() in file_lines.lower():
                occurrences.append(
                    {'linha': line_number, 'conteudo': file_lines}
                    )

        if occurrences:
            result = {
                'palavra': word,
                'arquivo': file_name,
                'ocorrencias': occurrences
            }
            results.append(result)

    return results
