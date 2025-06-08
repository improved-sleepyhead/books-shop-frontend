import { Fragment } from "react";

interface Subsection {
  id?: string;
  title: string;
  list?: string[];
}

interface ContentProps {
  id: string;
  title: string;
  content?: string;
  list?: string[];
  subsections?: Subsection[];
}

export const Content = ({
  id,
  title,
  content,
  list,
  subsections,
}: ContentProps) => {
  return (
    <section id={id} key={id} className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {content && <p className="mb-4">{content}</p>}
      {list && (
        <ul className="list-disc pl-5 space-y-1">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {subsections &&
        subsections.map((sub) => (
            <Fragment key={sub.title}>
                <section id={sub.id} className="mb-4 ml-4">
                <h3 className="text-lg font-medium mb-2">{sub.title}</h3>
                <ul className="list-disc pl-5 space-y-1">
                {sub.list?.map((item) => (
                    <li key={item}>{item}</li>
                ))}
                </ul>
                </section>
            </Fragment>
        ))}
    </section>
  );
};