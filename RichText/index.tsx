'use client'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import { cn } from '@/utilities/ui'
import { Image } from '@heroui/react'

// Define MediaBlockProps inline since it's not in payload-types
interface MediaBlockProps {
  media?: any
  caption?: any
  position?: 'default' | 'wide' | 'fullscreen'
  [key: string]: any
}

// Custom CSS classes configuration
export interface RichTextStyles {
  // Headings
  h1?: string
  h2?: string
  h3?: string
  h4?: string
  // Text formatting
  paragraph?: string
  bold?: string
  italic?: string
  underline?: string
  strikethrough?: string
  subscript?: string
  superscript?: string
  inlineCode?: string
  // Lists
  unorderedList?: string
  orderedList?: string
  checklist?: string
  listItem?: string
  checklistItem?: string
  // Links
  link?: string
  // Alignment
  alignLeft?: string
  alignCenter?: string
  alignRight?: string
  alignJustify?: string
  // Indent
  indent?: string
  // Media
  mediaBlock?: string
  mediaImage?: string
  mediaCaption?: string
  // Code block
  codeBlock?: string
  // Container
  container?: string
}

// Default styles
const defaultStyles: RichTextStyles = {
  h1: 'text-[#000000] text-[24px] sm:text-[32px] font-bold leading-[125%] font-noto mb-4',
  h2: 'text-[#000000] text-[20px] sm:text-[28px] font-medium leading-[125%] font-noto mb-3',
  h3: 'text-[#000000] text-[18px] sm:text-[26px] font-medium leading-[125%] font-noto mb-3',
  h4: 'text-[#000000] text-[16px] sm:text-[24px] font-medium leading-[125%] font-noto mb-2',
  paragraph: 'text-[#000000] text-[16px] font-normal leading-[150%] font-noto mb-4',
  bold: 'font-bold',
  italic: 'italic',
  underline: 'underline',
  strikethrough: 'line-through',
  subscript: 'align-sub text-[0.75em]',
  superscript: 'align-super text-[0.75em]',
  inlineCode: 'bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-red-600',
  unorderedList: 'list-disc font-noto pl-6 mb-4 text-[#000000] marker:text-[#000000] text-[16px] leading-[150%]',
  orderedList: 'list-decimal font-noto pl-6 mb-4 text-[#000000] marker:text-[#000000] text-[16px] leading-[150%]',
  checklist: 'list-none font-noto pl-0 mb-4 text-[#000000] text-[16px] leading-[150%]',
  listItem: 'text-[18px] text-[#000000] font-normal font-noto mb-2',
  checklistItem: 'flex items-start gap-2 text-[18px] text-[#000000] font-normal font-noto mb-2',
  link: 'text-blue-600 hover:text-blue-800 underline font-noto transition-colors duration-200',
  alignLeft: 'text-left',
  alignCenter: 'text-center',
  alignRight: 'text-right',
  alignJustify: 'text-justify',
  indent: 'pl-8',
  mediaBlock: 'flex justify-center items-center w-full h-full my-6',
  mediaImage: 'object-contain object-center w-full h-full',
  mediaCaption: 'text-center text-sm text-gray-500 mt-2 font-noto',
  codeBlock: 'col-start-2',
  container: '',
}

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<MediaBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'resource' ? `/resource/${slug}` : `/${slug}`
}

// Helper function to render text with formatting
const renderTextNode = (child: any, styles: RichTextStyles, index: number): React.ReactNode => {
  if (!('text' in child)) return null

  let content: React.ReactNode = child.text as string

  // Apply text formatting
  if (child.format) {
    // Bold (format & 1)
    if (child.format & 1) {
      content = <strong key={`bold-${index}`} className={styles.bold}>{content}</strong>
    }
    // Italic (format & 2)
    if (child.format & 2) {
      content = <em key={`italic-${index}`} className={styles.italic}>{content}</em>
    }
    // Strikethrough (format & 4)
    if (child.format & 4) {
      content = <s key={`strike-${index}`} className={styles.strikethrough}>{content}</s>
    }
    // Underline (format & 8)
    if (child.format & 8) {
      content = <u key={`underline-${index}`} className={styles.underline}>{content}</u>
    }
    // Code (format & 16)
    if (child.format & 16) {
      content = <code key={`code-${index}`} className={styles.inlineCode}>{content}</code>
    }
    // Subscript (format & 32)
    if (child.format & 32) {
      content = <sub key={`sub-${index}`} className={styles.subscript}>{content}</sub>
    }
    // Superscript (format & 64)
    if (child.format & 64) {
      content = <sup key={`sup-${index}`} className={styles.superscript}>{content}</sup>
    }
  }

  // Apply custom text styles (size, letterSpacing, lineHeight)
  const style: React.CSSProperties = {}
  if (child.style) {
    // Parse inline styles from Lexical
    const styleStr = child.style as string
    if (styleStr.includes('font-size')) {
      const match = styleStr.match(/font-size:\s*([^;]+)/)
      if (match) style.fontSize = match[1]
    }
    if (styleStr.includes('letter-spacing')) {
      const match = styleStr.match(/letter-spacing:\s*([^;]+)/)
      if (match) style.letterSpacing = match[1]
    }
    if (styleStr.includes('line-height')) {
      const match = styleStr.match(/line-height:\s*([^;]+)/)
      if (match) style.lineHeight = match[1]
    }
  }

  if (Object.keys(style).length > 0) {
    content = <span key={`style-${index}`} style={style}>{content}</span>
  }

  return content
}

// Helper function to render children recursively
const renderChildren = (children: any[], styles: RichTextStyles): React.ReactNode[] => {
  return children.map((child, index) => {
    if ('text' in child) {
      return renderTextNode(child, styles, index)
    }

    // Handle nested nodes (like links inside text)
    if (child.type === 'link') {
      return (
        <a
          key={index}
          href={child.fields?.url || '#'}
          className={styles.link}
          target={child.fields?.newTab ? '_blank' : undefined}
          rel={child.fields?.newTab ? 'noopener noreferrer' : undefined}
        >
          {child.children && renderChildren(child.children, styles)}
        </a>
      )
    }

    // Handle autolink (email, phone, URL auto-detection)
    if (child.type === 'autolink') {
      return (
        <a
          key={index}
          href={child.fields?.url || '#'}
          className={styles.link}
          target={child.fields?.linkType === 'custom' ? '_blank' : undefined}
          rel={child.fields?.linkType === 'custom' ? 'noopener noreferrer' : undefined}
        >
          {child.children && renderChildren(child.children, styles)}
        </a>
      )
    }

    if ('children' in child) {
      return renderChildren(child.children, styles)
    }

    return null
  })
}

// Get alignment class based on format
const getAlignmentClass = (format: string | number | undefined, styles: RichTextStyles): string => {
  if (!format) return ''

  const formatStr = typeof format === 'number' ? '' : format

  switch (formatStr) {
    case 'left':
      return styles.alignLeft || ''
    case 'center':
      return styles.alignCenter || ''
    case 'right':
      return styles.alignRight || ''
    case 'justify':
      return styles.alignJustify || ''
    default:
      return ''
  }
}

// Get indent class based on indent level
const getIndentClass = (indent: number | undefined, styles: RichTextStyles): string => {
  if (!indent || indent <= 0) return ''
  // Create dynamic padding based on indent level
  return `pl-${indent * 8}`
}

// Create JSX converters with custom styles
const createJsxConverters = (styles: RichTextStyles): JSXConvertersFunction<NodeTypes> =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),

    // Paragraph with alignment and indent support
    paragraph: ({ node }) => {
      const alignClass = getAlignmentClass(node.format, styles)
      const indentStyle = node.indent ? { paddingLeft: `${node.indent * 2}rem` } : {}

      return (
        <p
          className={cn(styles.paragraph, alignClass)}
          style={indentStyle}
        >
          {renderChildren(node.children, styles)}
        </p>
      )
    },

    // Headings with all levels
    heading: ({ node }) => {
      const Tag = node.tag
      const alignClass = getAlignmentClass(node.format, styles)
      const indentStyle = node.indent ? { paddingLeft: `${node.indent * 2}rem` } : {}

      const headingStyles: Record<string, string | undefined> = {
        h1: styles.h1,
        h2: styles.h2,
        h3: styles.h3,
        h4: styles.h4,
      }

      const headingClass = headingStyles[Tag] || ''
      const headingText = node.children[0] && 'text' in node.children[0]
        ? String(node.children[0].text)
        : ''

      return (
        <Tag
          className={cn(headingClass, alignClass)}
          style={indentStyle}
          id={encodeURIComponent(headingText)}
        >
          {renderChildren(node.children, styles)}
        </Tag>
      )
    },

    // Unordered list
    list: ({ node }) => {
      const alignClass = getAlignmentClass(node.format, styles)
      const indentStyle = node.indent ? { paddingLeft: `${node.indent * 2}rem` } : {}

      // Check if it's a checklist
      if (node.listType === 'check') {
        return (
          <ul
            className={cn(styles.checklist, alignClass)}
            style={indentStyle}
          >
            {node.children.map((child: any, index: number) => (
              <li key={index} className={styles.checklistItem}>
                <input
                  type="checkbox"
                  checked={child.checked || false}
                  readOnly
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>
                  {'children' in child && renderChildren(child.children, styles)}
                </span>
              </li>
            ))}
          </ul>
        )
      }

      if (node.tag === 'ul') {
        return (
          <ul
            className={cn(styles.unorderedList, alignClass)}
            style={indentStyle}
          >
            {node.children.map((child: any, index: number) => (
              <li key={index} className={styles.listItem}>
                {'children' in child && renderChildren(child.children, styles)}
              </li>
            ))}
          </ul>
        )
      }

      // Ordered list
      return (
        <ol
          className={cn(styles.orderedList, alignClass)}
          style={indentStyle}
        >
          {node.children.map((child: any, index: number) => (
            <li key={index} className={styles.listItem}>
              {'children' in child && renderChildren(child.children, styles)}
            </li>
          ))}
        </ol>
      )
    },

    // List item
    listitem: ({ node }) => (
      <li className={styles.listItem}>
        {renderChildren(node.children, styles)}
      </li>
    ),

    // Link
    link: ({ node }) => (
      <a
        href={node.fields.url}
        className={styles.link}
        target={node.fields.newTab ? '_blank' : undefined}
        rel={node.fields.newTab ? 'noopener noreferrer' : undefined}
      >
        {renderChildren(node.children, styles)}
      </a>
    ),

    // Autolink (auto-detected links like email, phone, URL)
    autolink: ({ node }: { node: any }) => (
      <a
        href={node.fields?.url || '#'}
        className={styles.link}
        target={node.fields?.linkType === 'custom' ? '_blank' : undefined}
        rel={node.fields?.linkType === 'custom' ? 'noopener noreferrer' : undefined}
      >
        {renderChildren(node.children, styles)}
      </a>
    ),

    // Blocks
    blocks: {
      mediaBlock: ({ node }: { node: any }) => {
        return (
          <figure className={styles.mediaBlock}>
            <Image
              className={styles.mediaImage}
              classNames={{ wrapper: 'object-contain w-full h-full' }}
              radius="none"
              src={node?.fields?.media?.url}
              alt={node?.fields?.media?.alt ? node?.fields?.media?.alt : 'Sahasri'}
              title={node?.fields?.media?.alt ? node?.fields?.media?.alt : 'Sahasri'}
              width="100%"
              height="100%"
            />
            {node?.fields?.caption && (
              <figcaption className={styles.mediaCaption}>
                {node.fields.caption}
              </figcaption>
            )}
          </figure>
        )
      },
      code: ({ node }: { node: any }) => (
        <CodeBlock className={styles.codeBlock} {...node.fields} />
      ),
    },
  })

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  customStyles?: Partial<RichTextStyles>
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const {
    className,
    enableProse = true,
    enableGutter = true,
    customStyles = {},
    ...rest
  } = props

  // Merge default styles with custom styles
  const mergedStyles: RichTextStyles = {
    ...defaultStyles,
    ...customStyles,
  }

  // Create converters with merged styles
  const jsxConverters = createJsxConverters(mergedStyles)

  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert ': enableProse,
        },
        mergedStyles.container,
        className,
      )}
      {...rest}
    />
  )
}

// Export styles type and default styles for external use
export { defaultStyles }
